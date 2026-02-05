<?php

trait PCP_API_Pay_Stripe {

  /*

  Pago exitoso	4242 4242 4242 4242	Éxito
  Pago rechazado	4000 0000 0000 9995	Rechazado
  Autenticación 3D Secure requerida	4000 0027 6000 3184	Pide 3D Secure
  Pago con fondos insuficientes	4000 0082 6000 3178	Error por fondos insuficientes

  👉 Usa cualquier fecha de vencimiento futura y cualquier CVC (por ejemplo, 12/34 y 123).

  */
  
  public function register_pcp_api_pay_stripe() {

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'pay/stripe/session/check',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_pay_stripe_session_check'],
            'permission_callback' => '__return_true'
          ]
        );

        register_rest_route(
          'poeticsoft/contentpayment',
          'stripe/webhook/events/session',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'pay_stripe_stripe_webhook_events_session'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );
  }

  function pay_stripe_session_check(WP_REST_Request $req) {

    global $wpdb;
        
    $res = new WP_REST_Response();

    try {
      
      $stripesessionid = $req->get_param('stripesessionid');
      $status = [
        'stripesessionid' => $stripesessionid,
        'done' => false
      ];

      $tablename = $wpdb->prefix . 'payment_pays';
      $payexists = $wpdb->get_results(
        $wpdb->prepare(
          "SELECT *
           FROM {$tablename}
           WHERE stripe_session_id = %s
           AND confirm_pay_date IS NOT NULL",
          $stripesessionid
        )
      ); 

      if(count($payexists)) {

        $status['done'] = true;
        $status['date'] = $payexists[0]->confirm_pay_date;
      }

      $res->set_data($status);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }

  public function pay_stripe_session_create(&$data) { 
      
    require_once(self::$dir . 'tools/stripe/vendor/autoload.php');
      
    $stripesecretkey = get_option('pcp_settings_stripe_secret_key');
    $stripesuccessurl = get_option('pcp_settings_stripe_success_url');
    $stripecancelurl = get_option('pcp_settings_stripe_cancel_url');
    
    $sessiondata = [
      'mode' => 'payment',
      'customer_email' => $data['email'],
      'success_url' => home_url($stripesuccessurl . '?stripe_session_success_id={CHECKOUT_SESSION_ID}'),
      'cancel_url' => home_url($stripecancelurl . '?stripe_session_cancel_id={CHECKOUT_SESSION_ID}'),
      'line_items' => [
        [
          'price_data' => [
            'currency' => 'eur',
            'unit_amount' => $data['price'] * 100,
            'tax_behavior' => 'inclusive',
            'product_data' => [
              'name' => $data['posttitle'],
              'description' => $data['postexcerpt'],
              'images' => [$data['postthumb']],
            ],
          ],
          'quantity' => 1,
        ]
      ],
    ];

    \Stripe\Stripe::setApiKey($stripesecretkey);
    $session = \Stripe\Checkout\Session::create($sessiondata);

    $data['stripesession'] = [
      'id' => $session->id, 
      'url' => $session->url
    ];
  }

  public function pay_stripe_webhook_events_session_success($sessionid) {

  global $wpdb;

    $tablename = $wpdb->prefix . 'payment_pays';
    $payexists = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT *
         FROM {$tablename}
         WHERE stripe_session_id = %s",
        $sessionid
      )
    );

    if(count($payexists)) {

      $id = intval($payexists[0]->id);
      $rowdata = [
        'confirm_pay_date' => current_time('mysql'),
        'stripe_session_result' => 'success'
      ];
      $rowformat = [
        '%s',
        '%s'
      ];
      $where = [
        'id' => $id
      ];
      $where_format = ['%d'];
      $data['payupdated'] = $wpdb->update(
        $tablename,
        $rowdata,
        $where,
        $rowformat,
        $where_format
      );

      $email = $payexists[0]->user_mail;
      $postid = $payexists[0]->post_id;
      $this->clear_access_cache($email, $postid);
    }
  }

  public function pay_stripe_webhook_events_session_cancel($sessionid) {

    global $wpdb;

    $tablename = $wpdb->prefix . 'payment_pays';
    $payexists = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT *
         FROM {$tablename}
         WHERE stripe_session_id = %s",
        $sessionid
      )
    );

    if(count($payexists)) {

      $id = intval($payexists[0]->id);
      $rowdata = [
        'stripe_session_result' => 'cancel'
      ];
      $rowformat = [
        '%s'
      ];
      $where = [
        'id' => $id
      ];
      $where_format = ['%d'];
      $data['payupdated'] = $wpdb->update(
        $tablename, 
        $rowdata, 
        $where, 
        $rowformat, 
        $where_format
      );
    }  
  }

  public function pay_stripe_stripe_webhook_events_session(WP_REST_Request $req) {     
      
    require_once(self::$dir . 'tools/stripe/vendor/autoload.php'); 
        
    $res = new WP_REST_Response();    

    try {  

      $payload = $req->get_body();
      $sigheader = $_SERVER['HTTP_STRIPE_SIGNATURE'];   
      
      $stripesecretkey = get_option('pcp_settings_stripe_secret_key');  
      $stripesignaturekey = get_option('pcp_settings_stripe_signature_key');

      \Stripe\Stripe::setApiKey($stripesecretkey); 
      $event = \Stripe\Webhook::constructEvent($payload, $sigheader, $stripesignaturekey);

      $eventtype = $event->type;
      $sessionid = $event->data->object->id;

      switch($eventtype) {

        case 'checkout.session.completed':

          $this->pay_stripe_stripe_webhook_events_session_success($sessionid);

          break;

        default:

          $this->pay_stripe_stripe_webhook_events_session_cancel($sessionid);

          break;
      }

      $res->set_status(200);
    
    } catch(\UnexpectedValueException $e) {
        
      $res->set_status(400);

    } catch(\Stripe\Exception\SignatureVerificationException $e) {
        
      $res->set_status(400);
    }

    return $res;
  }
}