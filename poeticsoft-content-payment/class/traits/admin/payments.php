<?php

trait PCP_Admin_Payments {   

  public function register_pcp_admin_payments() {

    add_action( 
      'admin_menu', 
      function () { 

        add_submenu_page(
          'poeticsoft', 
          'Accesos',
          'Accesos',
          'manage_options',
          'pcp_payments',
          [$this, 'admin_payments_render']
        );
      }
    ); 

    add_action( 
      'admin_enqueue_scripts', 
      function () {

        $screen = get_current_screen();

        if (
          $screen 
          && 
          ($screen->id === 'poeticsoft_page_pcp_payments') 
        ) {  

          wp_enqueue_script(
            'poeticsoft-content-payment-admin-payments', 
            self::$url . 'ui/admin/payments/main.js',
            [
              'wp-blocks',
              'wp-block-editor',
              'wp-element',
              'wp-components',
              'wp-data',
              'wp-hooks',
              'lodash'
            ], 
            filemtime(self::$dir . 'ui/admin/payments/main.js'),
            true
          );

          wp_enqueue_style( 
            'poeticsoft-content-payment-admin-payments',
            self::$url . 'ui/admin/payments/main.css', 
            [], 
            filemtime(self::$dir . 'ui/admin/payments/main.css'),
            'all' 
          );

          $accesstype = get_option('pcp_settings_campus_access_by');

          $data_json = json_encode($accesstype);
          $inline_js = "var poeticsoft_content_payment_admin_accesstype_origin = {$data_json};";
          wp_add_inline_script(
            'poeticsoft-content-payment-admin-payments', 
            $inline_js, 
            'after'
          );
        }
      } 
    );
  }
  
  public function get_payments_data_from_gsheets() {
    
    $sheetdata = $this->gclient_sheet_read();
    
    if(
      $sheetdata['result'] = 'ok'
      &&
      isset($sheetdata['data'])
    ) {
      
      // $header = $sheetdata['header']; 
      $sheetdata = $sheetdata['data'];

      $data = [];
      foreach($sheetdata as $row) {

        $emailvalue = sanitize_email(trim($row[0]));        
        $postidsvalue = isset($row[1]) ? trim($row[1]) : '';
        $postids = $postidsvalue;
        $postids = $postids == '' ?
        []
        :
        explode(' ', $postids);
        $postids = array_map(
          function($postid) { return trim($postid); },
          $postids
        );

        if(count($postids)) {

          foreach($postids as $postid) {

            $post = get_post($postid);
            $postid = $post ? $postid : 'no';
            $pay = [
              'user_mail' => $emailvalue,
              'post_id' => $postid
            ];

            $data[] = $pay;
          }

        } else {

          $pay = [
            'user_mail' => $emailvalue,
            'post_id' => 0
          ];
          
          $data[] = $pay;
        }
      }
      
      return $data;
      
    } else {  
      
      return [];
    }   
  }
  
  public function get_payments_data_from_directus() {
      
    $plugin_settings_prefix = 'pcp_settings_';
    $directus_endpoint_sync_access_option_name = $plugin_settings_prefix . 'directus_endpoint_sync_access';
    $directus_endpoint_sync_access_token_option_name = $plugin_settings_prefix . 'directus_endpoint_sync_access_token';
    
    $directus_endpoint_sync_access = get_option($directus_endpoint_sync_access_option_name);
    $directus_endpoint_sync_access_token = get_option($directus_endpoint_sync_access_token_option_name);    
    
    $args = [
      'headers' => [
        'Authorization' => 'Bearer ' . $directus_endpoint_sync_access_token,
        'Content-Type'  => 'application/json', // Opcional, pero recomendado
      ],
      'timeout' => 30, // Tiempo de espera en segundos
    ];
    
    $response = wp_remote_get(
      $directus_endpoint_sync_access,
      $args
    );
    
    $data = [];
    
    if (!is_wp_error($response)) {
        
      $http_code = wp_remote_retrieve_response_code($response);
      if ($http_code !== 200) {
        
        $data = [];
        
      } else {
        
        $body = wp_remote_retrieve_body($response);
        $directus_data = json_decode($body);
        
        foreach($directus_data->data as $row) {

          $emailvalue = sanitize_email(trim($row->humano_id->correo));        
          $postidsvalue = trim($row->wp_post_ids);
          $postids = $postidsvalue == '' ?
          []
          :
          explode(' ', $postidsvalue);
          $postids = array_map(
            function($postid) { return trim($postid); },
            $postids
          );

          if(count($postids)) {

            foreach($postids as $postid) {

              $post = get_post($postid);
              $postid = $post ? $postid : 'no';
              $pay = [
                'user_mail' => $emailvalue,
                'post_id' => $postid
              ];

              $data[] = $pay;
            }

          } else {

            $pay = [
              'user_mail' => $emailvalue,
              'post_id' => 0
            ];
            
            $data[] = $pay;
          }
        }      
      }
    }
    
    return $data;
  }

  public function admin_payments_update_payments() { 
    
    $campus_access_by = get_option('pcp_settings_campus_access_by');
    
    $access_data = [];
    
    switch($campus_access_by) {
      
      case 'gsheets':

        $access_data = $this->get_payments_data_from_gsheets();
        
        break;
        
      case 'directus':

        $access_data = $this->get_payments_data_from_directus();
        
        break;
        
      default:
      
        break;
    }

    global $wpdb;
    $tablename = $wpdb->prefix . 'payment_pays';
    $wpdb->query("TRUNCATE TABLE $tablename");
    foreach($access_data as $pay) {

      $wpdb->insert(
        $tablename,
        $pay,
        [
          '%s', // user_mail
          '%d', // post_id
        ]
      );
    }

    return [
      'result' => 'ok',
      'data' => $access_data
    ];
  }

  public function admin_payments_render() {

    echo '<div
      id="pcp_admin_payments"
      class="wrap"
    >
      <h1>Accesos</h1>
      <div id="PaymentsAPP"></div>
    </div>';
  }
}