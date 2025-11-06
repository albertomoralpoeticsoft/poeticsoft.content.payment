<?php

add_action(
  'add_meta_boxes', 
  function($posttype, $post) {    
    
    $postid = $post->ID;
    $campusrootid = intval(get_option('poeticsoft_content_payment_settings_campus_root_post_id')); 
    $ancestors = get_post_ancestors($postid);

    if(
      $posttype == 'page'
      &&
      in_array(intval($campusrootid), $ancestors)
    ) {

      add_meta_box(
        'poeticsoft_content_payment_assign_price',
        'Precio',
        function ($post) {

          echo poeticsoft_content_payment_form_editprice($post->ID);
        },
        'page',
        'side',
        'default'
      );
    }
  },
  10,
  2
);