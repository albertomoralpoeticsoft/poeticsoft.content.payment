<?php

trait PCPT_API {
  
  public function register_pcpt_api() {

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
        wp_localize_script(
          'poeticsoft-content-payment-api-admin', 
          'poeticsoft_content_payment_api', 
          [
            'nonce' => wp_create_nonce('wp_rest'),
          ]
        );

        $campusrootid = intval(get_option('pcpt_settings_campus_root_post_id'));
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

        wp_localize_script(
          'poeticsoft-content-payment-admin-pageslist', 
          'poeticsoft_content_payment_admin_campus_ids',
          $campusids
        ); 
      }
    );
    
    add_action(
      'init', 
      function() {
        
        wp_register_script(
          'poeticsoft-content-payment-api-front',
          false,
          [],
          null,
          true
        );
        wp_enqueue_script('poeticsoft-content-payment-api-front');
        wp_localize_script(
          'poeticsoft-content-payment-api-front', 
          'poeticsoft_content_payment_api', 
          [
            'nonce' => wp_create_nonce('wp_rest')
          ]
        );
      }
    );

    $allowedpublic = [
      '/wp-json/filebird/*',
      '/wp-json/poeticsoft/contentpayment/mail/sendtest'
    ];

    $allowedlogedusers = [
      // '/wp-json/poeticsoft/contentpayment/price/getprice*'
    ];

    add_filter( 
      'rest_authentication_errors', 
      function($result) use ($allowedpublic, $allowedlogedusers) { 

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
