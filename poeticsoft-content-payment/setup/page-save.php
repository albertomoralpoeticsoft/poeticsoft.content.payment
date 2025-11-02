<?php

add_action(
  'wp_insert_post', 
  function($postid, $post, $update) {

    if ($update) return;

    if($post->post_type == 'page') { 

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_type', 
        'free'
      );
    }
  }, 
  10, 
  3
);

add_action(
  'save_post_page', 
  function($postid, $post, $update) {

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $postid)) return;

    if(isset($_POST['poeticsoft_content_payment_assign_price_type'])) {

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_type', 
        $_POST['poeticsoft_content_payment_assign_price_type']
      );
    }

    if(isset($_POST['poeticsoft_content_payment_assign_price_value'])) {

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_value', 
        $_POST['poeticsoft_content_payment_assign_price_value']
      );
    }
  },
  10,
  3
);