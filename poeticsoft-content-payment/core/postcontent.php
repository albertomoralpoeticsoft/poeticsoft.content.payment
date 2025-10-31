<?php

add_filter( 
  'render_block_core/post-content', 
  function($blockcontent, $block) {

    global $post;

    if(!$post) { return; }

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