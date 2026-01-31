<?php

trait PCP_API_Identify_MailRelay {
  
  public function api_identify_mailrelay($email) { 

    try {

      $identifyurl = get_option('pcp_settings_mailrelay_api_url');
      $identifykey = get_option('pcp_settings_mailrelay_api_key');

      $url = $identifyurl . '/api/v1/subscribers?q[email_eq]=' . $email;
      $args = [
        'headers'     => [
          'X-AUTH-TOKEN' => $identifykey,
          'Content-Type' => 'application/json',
          'Accept'       => 'application/json',
        ],
      ];
        
      $response = wp_remote_get($url, $args);

      if (is_wp_error($response)) {
        
        return [
          'result' => 'error',
          'message' => $response->get_error_message()
        ];

      } else {

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        if(count($data)) {          

          $usercode = $this->api_identify_subscriber_registeroridentify($email);

          return [
            'result' => 'ok',
            'code' => $usercode,
            'data' => $data[0]
          ];

        } else {

          return [
            'result' => 'error',
            'data' => 'No se ha encontrado'
          ];
        }
      }

    } catch (Exception $e) {

      return [
        'result' => 'error',
        'code' => $e->getCode(),
        'reason' => $e->getMessage()
      ];
    }
  }
}
