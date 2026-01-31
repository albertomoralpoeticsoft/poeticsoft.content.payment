<?php

trait PCP_API {
  
  public function register_pcp_api() {

    add_action( 
      'admin_enqueue_scripts', 
      function () {
        
        wp_register_script(
          'poeticsoft-content-payment-api-admin',
          false,
          [],
          null,
          true
        );
            
        wp_enqueue_script('poeticsoft-content-payment-api-admin');
        
        $data_json = json_encode([
          'nonce' => wp_create_nonce('wp_rest'),
        ]);
        $inline_js = "var poeticsoft_content_payment_api = {$data_json};";
        wp_add_inline_script(
          'poeticsoft-content-payment-api-admin', 
          $inline_js, 
          'after'
        );

        $campusrootid = intval(get_option('pcp_settings_campus_root_post_id'));
        if(
          !$campusrootid
          ||
          $campusrootid == ''
        ) {

          return;        
        }

        $descendants = get_pages([
          'child_of' => $campusrootid,
          'post_type' => 'page',
          'post_status' => 'publish'
        ]);
        $descendantids = wp_list_pluck($descendants, 'ID');
        $descendantids[] = $campusrootid;
        $campusids = array_map(
          function($id) {

            return 'post-' . $id;
          },
          $descendantids
        );

        $data_json = json_encode($campusids);
        $inline_js = "var poeticsoft_content_payment_admin_campus_ids = {$data_json};";
        wp_add_inline_script(
          'poeticsoft-content-payment-api-admin', 
          $inline_js, 
          'after'
        );
      }
    );
    
    add_action(
      'wp_enqueue_scripts', 
      function() {
        
        wp_register_script(
          'poeticsoft-content-payment-api-front',
          false,
          [],
          null,
          true
        );

        wp_enqueue_script('poeticsoft-content-payment-api-front');

        $data_json = json_encode([
          'nonce' => wp_create_nonce('wp_rest')
        ]);
        $inline_js = "var poeticsoft_content_payment_api = {$data_json};";
        wp_add_inline_script(
          'poeticsoft-content-payment-api-front', 
          $inline_js, 
          'after'
        );
      }
    );

    $allowedpublic = [
      '/wp-json/filebird/*',
      // '/wp-json/poeticsoft/contentpayment/mail/sendtest',
      // '/wp-json/poeticsoft/contentpayment/campus/calendar/events/*',
      // '/wp-json/poeticsoft/contentpayment/campus/payments/*'
    ];

    $allowedlogedusers = [
      // '/wp-json/poeticsoft/contentpayment/price/getprice*'
    ];

    add_filter( 
      'rest_authentication_errors', 
      function($result) use ($allowedpublic, $allowedlogedusers) { 

        return $result;

        if (!empty($result)) {
          
          return $result;
        } 

        $request_uri = $_SERVER['REQUEST_URI'] ?? '';
        
        foreach ($allowedpublic as $pattern) {

          $regex = '#^' . str_replace('\*', '.*', preg_quote($pattern, '#')) . '$#';
          if (preg_match($regex, $request_uri)) {

            return $result;

            break;
          }
        } 

        if (is_user_logged_in()) {

          foreach ($allowedlogedusers as $pattern) {

            $regex = '#^' . str_replace('\*', '.*', preg_quote($pattern, '#')) . '$#';
            if (preg_match($regex, $request_uri)) {

              return $result;

              break;
            }
          }

          if ($this->api_isadminuser()) {

            return $result;
          }
        }

        return new WP_Error(

          'rest_cannot_access',
          __('REST API restricted access. Needs authentication.'),
          array( 'status' => 401 )
        );
      }
    );
  }

  public function api_isloggeduser($userid) {
    
    $userloggedid = get_current_user_id();

    return $userloggedid == intval($userid);
  }

  public function api_isadminuser() {
    
    return in_array('administrator',  wp_get_current_user()->roles);
  }
}
