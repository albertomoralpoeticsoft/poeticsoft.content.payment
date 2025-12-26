<?php

trait PCPT_API_Mail {
  
  public function register_pcpt_api_mail() { 

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'mail/sendtest',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_mail_sendtest'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );   
  }

  public function api_mail_sendtest( WP_REST_Request $req ) {
      
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
}