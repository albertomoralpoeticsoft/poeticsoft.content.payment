<?php

add_filter(
  'manage_page_posts_columns',
  function ($columns) {  

    $columns['price'] = 'Precio';

    return $columns;
  }
);

add_action(
  'manage_page_posts_custom_column', 
  function(
    $column_name, 
    $postid
  ) {

    if ($column_name == 'price') {   
    
      $campusrootid = intval(get_option('poeticsoft_content_payment_settings_campus_root_post_id')); 
      $ancestors = get_post_ancestors($postid);

      if(
        in_array(intval($campusrootid), $ancestors)
        ||
        $postid == $campusrootid
      ) {

        echo poeticsoft_content_payment_form_editprice($postid);
      }
    }
  }, 
  10, 
  2
); 