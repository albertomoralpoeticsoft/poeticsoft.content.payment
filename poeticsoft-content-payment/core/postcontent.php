<?php

add_filter( 
  'render_block_core/post-content', 
  function($blockcontent, $block) {

    global $post;

    if(!$post) { 
      
      return false; 
    }

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

    if(poeticsoft_content_payment_tools_canaccess_byid()) {

      return $blockcontent;
    }

    $useremail = poeticsoft_content_payment_tools_canaccess_byemail();

    if($useremail) {

      $postpaid = poeticsoft_content_payment_tools_canaccess_bypostpaid($useremail);

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