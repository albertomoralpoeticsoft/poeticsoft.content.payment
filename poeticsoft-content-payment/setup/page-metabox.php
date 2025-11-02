<?php

add_action(
  'add_meta_boxes', 
  function() {

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
);