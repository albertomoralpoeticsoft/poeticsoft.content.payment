<?php

function poeticsoft_content_payment_mailrelay_subscriber_registeroridentify($email) {  

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

  wp_mail(
    $email,
    '[POETICSOFT] Confirma tu código',
    '<p>El código para identificarte es: ' . $usercode . '</p>' . 
    '<p><a href="https://sandbox.poeticsoft.com">Poeticsoft Sandbox</a></p>'
  );

  return $usercode;
}

function poeticsoft_content_payment_mailrelay_subscriber_register( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();

  try {

    $email = $req->get_param('email');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      
      $res->set_data([
        'result' => 'ko',
        'message' => 'Invalid email format'
      ]);

    } else { 

      $mailrelayurl = get_option('poeticsoft_content_payment_settings_mailrelay_api_url');
      $mailrelaykey = get_option('poeticsoft_content_payment_settings_mailrelay_api_key');

      $url = $mailrelayurl . '/api/v1/subscribers';
      $args = [
        'headers' => [
          'X-AUTH-TOKEN' => $mailrelaykey,
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
          'result' => 'ko',
          'message' => $response->get_error_message()
        ]);

      } else {

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        $usercode = poeticsoft_content_payment_mailrelay_subscriber_registeroridentify($email);

        $res->set_data([
          'result' => 'ok',
          'usercode' => $usercode,
          'data' => $data
        ]);
      }
    }
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

function poeticsoft_content_payment_mailrelay_subscriber_identify( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();

  try {

    $email = $req->get_param('email');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      
      $res->set_data([
        'result' => 'ko',
        'message' => 'Invalid email format'
      ]);

    } else { 

      $mailrelayurl = get_option('poeticsoft_content_payment_settings_mailrelay_api_url');
      $mailrelaykey = get_option('poeticsoft_content_payment_settings_mailrelay_api_key');

      $url = $mailrelayurl . '/api/v1/subscribers?q[email_eq]=' . $email;
      $args = [
        'headers'     => [
          'X-AUTH-TOKEN' => $mailrelaykey,
          'Content-Type' => 'application/json',
          'Accept'       => 'application/json',
        ],
      ];
      $response = wp_remote_get($url, $args);

      if (is_wp_error($response)) {
        
        $res->set_data([
          'result' => 'ko',
          'message' => $response->get_error_message()
        ]);

      } else {

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        $usercode = poeticsoft_content_payment_mailrelay_subscriber_registeroridentify($email);

        if(count($data)) {
          $res->set_data([
            'result' => 'ok',
            'code' => $usercode,
            'data' => $data[0]
          ]);

        } else {

          $res->set_data([
            'result' => 'ok',
            'data' => 'notfound'
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

function poeticsoft_content_payment_mailrelay_subscriber_confirmcode( WP_REST_Request $req ) {
      
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
        'result' => 'ko',
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

add_action(
  'rest_api_init',
  function () {

    register_rest_route(
      'poeticsoft/contentpayment',
      'mailrelay/subscriber/register',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_mailrelay_subscriber_register',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'poeticsoft/contentpayment',
      'mailrelay/subscriber/identify',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_mailrelay_subscriber_identify',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'poeticsoft/contentpayment',
      'mailrelay/subscriber/confirmcode',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_mailrelay_subscriber_confirmcode',
        'permission_callback' => '__return_true'
      ]
    );
  }
);