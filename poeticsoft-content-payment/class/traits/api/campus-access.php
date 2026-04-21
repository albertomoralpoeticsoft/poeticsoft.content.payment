<?php

trait PCP_API_Campus_Access {
  
  public function register_pcp_api_campus_access() { 

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/access',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_campus_access'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );   
  }
    
  public function api_campus_access( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     
      
      $plugin_settings_prefix = 'pcp_settings_';
      $directus_endpoint_log_access_option_name = $plugin_settings_prefix . 'directus_endpoint_log_access';
      $directus_endpoint_log_access_token_option_name = $plugin_settings_prefix . 'directus_endpoint_log_access_token';
      
      $directus_endpoint_log_access = get_option($directus_endpoint_log_access_option_name);
      $directus_endpoint_log_access_token = get_option($directus_endpoint_log_access_token_option_name);
      
      $body = $req->get_params();
      
      /*
      
      */
      
      $args = [
        'method'      => 'POST',
        'timeout'     => 45,
        'redirection' => 5,
        'httpversion' => '1.0',
        'blocking'    => false,
        'headers'     => [
          'Content-Type'  => 'application/json',
          'Authorization' => 'Bearer ' . $directus_endpoint_log_access_token,
        ],
        'body'        => json_encode($body),
        'cookies'     => [],
      ];

      $response = wp_remote_post(
        $directus_endpoint_log_access,
        $args
      ); 
      
      /*
      
      $this->log('---------------------------------------------');
      if (is_wp_error($response)) {
        
        $this->log('Error en wp_remote_post: ' . $response->get_error_message());
        
      } else {  
      
        $this->log($response);
      }
      
      $result = [
        // 'url_option_name' => $directus_endpoint_log_access_option_name,
        // 'token_option_name' => $directus_endpoint_log_access_token_option_name,
        'url' => $directus_endpoint_log_access,
        'token' => $directus_endpoint_log_access_token,
        'body' => $body        
      ];
      
      $this->log('---------------------------------------------');
      $this->log($result);

      $res->set_data($result);
      
      */
      
      $res->set_data(true);
    
    } catch (Exception $e) {
      
      $res->set_data(false);
    }

    return $res;
  }    
}