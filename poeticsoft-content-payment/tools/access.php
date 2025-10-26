<?php

function poeticsoft_content_payment_canaccess($userid, $postid) {

  return false;
}

add_action(
  'template_redirect', 
  function() {

    if (is_singular('page')) {

      global $post;

      return;
    }
  }
);