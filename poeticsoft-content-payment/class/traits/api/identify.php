<?php

trait PCP_API_Identify {
  
  public function register_pcp_api_identify() {  

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'identify/subscriber/register',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_identify_subscriber_register'],
            'permission_callback' => '__return_true'
          ]
        );

        register_rest_route(
          'poeticsoft/contentpayment',
          'identify/subscriber/identify',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_identify_subscriber_identify'],
            'permission_callback' => '__return_true'
          ]
        );

        register_rest_route(
          'poeticsoft/contentpayment',
          'identify/subscriber/checktemporalcode',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_identify_subscriber_checktemporalcode'],
            'permission_callback' => '__return_true'
          ]
        );

        register_rest_route(
          'poeticsoft/contentpayment',
          'identify/subscriber/confirmcode',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_identify_subscriber_confirmcode'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    ); 
  }

  public function api_identify_subscriber_registeroridentify($email) {  

    $usercode = mt_rand(100000, 999999);

    setcookie(
      'useremail',
      $email, 
      0,
      '/',
      COOKIE_DOMAIN,
      is_ssl(),
      true
    );

    setcookie(
      'usercode',
      $usercode,
      0,
      '/',
      COOKIE_DOMAIN,
      is_ssl(),
      true
    ); 

    setcookie(
      'codeconfirmed',
      'no',
      0,
      '/',
      COOKIE_DOMAIN,
      is_ssl(),
      true
    );    

    $sent = wp_mail(
      $email,
      '[POETICSOFT] Confirma tu código',
      '<p>El código para identificarte es: ' . $usercode . '</p>' . 
      '<p><a href="https://sandbox.poeticsoft.com">Poeticsoft Sandbox</a></p>'
    );

    return $usercode;
  }

  public function api_identify_subscriber_checktemporalcode(WP_REST_Request $req) { 
        
    $res = new WP_REST_Response();

    try {

      if(!get_option('pcp_settings_campus_use_temporalcode')) {      
          
        $res->set_data([
          'result' => 'error',
          'message' => 'No está permitido el uso del código'
        ]);

      } else {

        $code = $req->get_param('code');
        $temporalcode = get_option('pcp_settings_campus_temporal_access_code');
        $temporalmail = get_option('pcp_settings_campus_temporal_access_mail');

        if($code == $temporalcode) {         

          setcookie(
            'useremail',
            $temporalmail, 
            0,
            '/',
            COOKIE_DOMAIN,
            is_ssl(),
            true
          );  

          setcookie(
            'codeconfirmed',
            'yes',
            0,
            '/',
            COOKIE_DOMAIN,
            is_ssl(),
            true
          );     

          $res->set_data([
            'result' => 'ok'
          ]);

        } else {

          $res->set_data([
            'result' => 'error',
            'message' => 'El código es incorrecto'
          ]);
        }
      }
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }

  public function api_identify_subscriber_register( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {

      $email = $req->get_param('email');

      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
        $res->set_data([
          'result' => 'error',
          'message' => 'Invalid email format'
        ]);

      } else { 

        $identifyurl = get_option('pcp_settings_identify_api_url');
        $identifykey = get_option('pcp_settings_identify_api_key');

        $url = $identifyurl . '/api/v1/subscribers';
        $args = [
          'headers' => [
            'X-AUTH-TOKEN' => $identifykey,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
          ],
          'body' => json_encode([
            'email' => $email,
            'status' => 'active',
            'group_ids' => [8]
          ]),
        ];
        $response = wp_remote_post($url, $args);

        if (is_wp_error($response)) {
          
          $res->set_data([
            'result' => 'error',
            'message' => $response->get_error_message()
          ]);

        } else {

          $body = wp_remote_retrieve_body($response);
          $data = json_decode($body, true);

          if(isset($data['errors'])) {          
          
            $res->set_data([
              'result' => 'error',
              'data' => $data
            ]);

          } else {

            $usercode = $this->api_identify_subscriber_registeroridentify($email);

            $res->set_data([
              'result' => 'ok',
              'usercode' => $usercode,
              'data' => $data
            ]);
          }
        }
      }
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }

  public function api_identify_subscriber_identify( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {

      $email = $req->get_param('email');

      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
        $res->set_data([
          'result' => 'error',
          'message' => 'Invalid email format'
        ]);

      } else { 

        $accesstype = get_option('pcp_settings_campus_access_by');

        switch($accesstype) {

          case 'mailrelay':

            $res->set_data($this->api_identify_mailrelay($email));

            break;

          case 'gsheets':

            $res->set_data($this->api_identify_gsheets($email));

            break;

          default:

            $res->set_data([
              'result' => 'error',
              'message' => 'Método de identificación no existe'
            ]);

            break;
        }
      }

    } catch (Exception $e) {

      return [
        'result' => 'error',
        'code' => $e->getCode(),
        'reason' => $e->getMessage()
      ];
    }

    return $res;
  }

  public function api_identify_subscriber_confirmcode( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {

      $email = $req->get_param('email');
      $code = $req->get_param('code');    
      $cookieemail = $_COOKIE['useremail'];
      $cookiecode = $_COOKIE['usercode'];

      if(
        $email == $cookieemail
        &&
        $code == $cookiecode
      ) { 

        setcookie(
          'codeconfirmed',
          'yes',
          0,
          '/',
          COOKIE_DOMAIN,
          is_ssl(),
          true
        );      

        $res->set_data([
          'result' => 'ok'
        ]);

      } else {

        // TODO ENCRIPT!!!

        unset($_COOKIE['useremail']);
        unset($_COOKIE['usercode']);
        unset($_COOKIE['codeconfirmed']);
        setcookie('useremail', '', time() - 3600, '/');
        setcookie('usercode', '', time() - 3600, '/');
        setcookie('codeconfirmed', '', time() - 3600, '/');

        $res->set_data([
          'result' => 'error',
          'message' => 'El código no es correcto.',
          'cookie' => json_encode($_COOKIE),
          'email' => $email,
          'code' => $code,    
          'cookieemail' => $cookieemail,
          'cookiecode' => $cookiecode
        ]);
      }
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
}