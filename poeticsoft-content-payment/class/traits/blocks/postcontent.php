<?php

trait PCPT_Blocks_Postcontent {
  
  public function register_pcpt_blocks_postcontent() {  
      

    add_filter( 
      'render_block_core/post-content', 
      function($blockcontent, $block) {

        global $post;

        if(!$post) { 
          
          return false; 
        }  

        add_action( 
          'wpn_enqueue_scripts', 
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
              'poeticsoft-content-payment-admin',
              self::$url . 'ui/frontend/postcontent/main.css', 
              [], 
              filemtime(self::$dir . 'ui/frontend/postcontent/main.css'),
              'all' 
            );
          }
        );

        $current_user = wp_get_current_user();
        $allowadmin = get_option('poeticsoft_content_payment_settings_campus_roles_access', false);
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

          return '<div class="wp-block-poeticsoft_content_payment_postcontent">
            <div class="Forms Identify"></div>
          </div>';
        }
      },
      10,
      2
    );

  }
}
