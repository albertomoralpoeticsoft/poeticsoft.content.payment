<?php

function poeticsoft_content_payment_mailrelay_subscriber_identify( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();

  try {

    $email = get_param('email');

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
          'Accept' => 'application/json',
        ],
      ];
      $response = wp_remote_get($url, $args);

      $res->set_data($response);

      // $res->set_data([
      //   'result' => 'notregistered',
      //   'message' => 'Email not registered'
      // ]);
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
      'mailrelay/subscriber/identify',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_mailrelay_subscriber_identify',
        'permission_callback' => '__return_true'
      ]
    );
  }
);