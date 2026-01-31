<?php

trait PCP_Blocks_Postcontent {
  
  public function register_pcp_blocks_postcontent() {       

    add_filter( 
      'render_block_core/post-content', 
      function($blockcontent, $block) {

        global $post;

        if(!$post) { 
          
          return false; 
        }  

        add_action( 
          'wp_enqueue_scripts', 
          function () {

            wp_enqueue_script(
              'poeticsoft-content-payment-core-block-postcontent', 
              self::$url . 'ui/frontend/postcontent/main.js',
              [
                'jquery'
              ], 
              filemtime(self::$dir . 'ui/frontend/postcontent/main.js'),
              true
            );

            wp_enqueue_style( 
              'poeticsoft-content-payment-core-block-postcontent',
              self::$url . 'ui/frontend/postcontent/main.css', 
              [], 
              filemtime(self::$dir . 'ui/frontend/postcontent/main.css'),
              'all' 
            );            

            $accesstype = get_option('pcp_settings_campus_access_by');

            $data_json = json_encode($accesstype);
            $inline_js = "var poeticsoft_content_payment_core_block_postcontent_accesstype_origin = {$data_json};";
            wp_add_inline_script(
              'poeticsoft-content-payment-core-block-postcontent', 
              $inline_js, 
              'after'
            );
          }
        );

        $current_user = wp_get_current_user();
        $allowadmin = get_option('pcp_settings_campus_roles_access', false);
        if (
          in_array(
            'administrator', 
            (array) $current_user->roles
          ) 
          &&
          $allowadmin
        ) {

          return '<div class="ViewAsAdmin">
            Vista de administrador (acceso total)
          </div>' . $blockcontent;
        }

        if($this->canaccess_byid()) {

          return $blockcontent;
        }

        $useremail = $this->canaccess_byemail();

        if($useremail) {

          $postpaid = $this->canaccess_bypostpaid($useremail);

          if($postpaid) {        
          
            return $blockcontent;

          } else {

            return '<div            
              class="wp-block-poeticsoft_content_payment_postcontent"
              data-email="' . $useremail . '"
              data-postid="' . $post->ID . '"
            >
              <div class="Forms ShouldPay">SHOULD PAY</div>
            </div>';
          }

        } else {

          if(get_option('pcp_settings_campus_use_temporalcode')) {

            return '<div class="wp-block-poeticsoft_content_payment_postcontent">
              <div class="Forms UseTemporalCode"></div>
            </div>';

          } else {

            return '<div class="wp-block-poeticsoft_content_payment_postcontent">
              <div class="Forms Identify"></div>
            </div>';
          }
        }
      },
      10,
      2
    );

  }
}
