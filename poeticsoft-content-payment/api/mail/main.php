<?php

function poeticsoft_content_payment_mail_sendtest( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();
  
  $process = [];

  $process[] = 'Intento de envio de mail';  

  try { 

    $mailsent = wp_mail(
      'poeticsoft@gmail.com',
      'Subject',
      'Body'
    );

    $process[] = $mailsent ? 'sent' : 'not sent';

    $res->set_data([
      'response' => $process
    ]);
  
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
      'mail/sendtest',
      [
        'methods'  => 'GET',
        'callback' => 'poeticsoft_content_payment_mail_sendtest',
        'permission_callback' => '__return_true'
      ]
    );
  }
);