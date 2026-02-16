<?php

trait PCP_Admin_Payments {   

  public function register_pcp_admin_payments() {

    add_action( 
      'admin_menu', 
      function () { 

        add_submenu_page(
          'poeticsoft', 
          'Pagos',
          'Pagos',
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

  public function admin_payments_update_payments() { 

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

      global $wpdb;
      $tablename = $wpdb->prefix . 'payment_pays';
      $wpdb->query("TRUNCATE TABLE $tablename");
      foreach($data as $pay) {

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
        'data' => $sheetdata
      ];

    } else {
      
      return [
        'result' => 'error',
        'reason' => $sheetdata['reason']
      ];
    }
  }

  public function admin_payments_render() {

    echo '<div
      id="pcp_admin_payments"
      class="wrap"
    >
      <h1>Accesos [AKA Pagos]</h1>
      <div id="PaymentsAPP"></div>
    </div>';
  }
}