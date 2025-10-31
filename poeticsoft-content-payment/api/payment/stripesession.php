<?php

/*

Pago exitoso	4242 4242 4242 4242	Éxito
Pago rechazado	4000 0000 0000 9995	Rechazado
Autenticación 3D Secure requerida	4000 0027 6000 3184	Pide 3D Secure
Pago con fondos insuficientes	4000 0082 6000 3178	Error por fondos insuficientes

👉 Usa cualquier fecha de vencimiento futura y cualquier CVC (por ejemplo, 12/34 y 123).

*/

function poeticsoft_content_payment_stripe_session_create(&$data) { 
    
  require_once(WP_PLUGIN_DIR . '/poeticsoft-content-payment/tools/stripe/vendor/autoload.php');
    
  $stripesecretkey = get_option('poeticsoft_content_payment_settings_stripe_secret_key');
  $stripesuccessurl = get_option('poeticsoft_content_payment_settings_stripe_success_url');
  $stripecancelurl = get_option('poeticsoft_content_payment_settings_stripe_cancel_url');
  
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

function poeticsoft_content_payment_pay_stripe_session_check(WP_REST_Request $req) {

  global $wpdb;
      
  $res = new WP_REST_Response();

  try {
    
    $stripesessionid = $req->get_param('stripesessionid');
    $status = [
      'stripesessionid' => $stripesessionid,
      'done' => false
    ];

    $tablename = $wpdb->prefix . 'payment_pays';
    $payexists = $wpdb->get_results("
      SELECT * 
      FROM {$tablename}
      WHERE stripe_session_id='{$stripesessionid}'
      AND confirm_pay_date IS NOT NULL;
    "); 

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

