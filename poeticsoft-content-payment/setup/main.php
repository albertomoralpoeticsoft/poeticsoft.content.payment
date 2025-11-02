<?php

add_action(
  'init',
  function () {
     
    add_post_type_support( 'page', 'excerpt' );
  }
);

add_action(
  'template_redirect',
  function() {

    global $post;

    if (
      $post
      &&
      isset($_GET['action'])
      &&
      $_GET['action'] == 'logout'
    ) {

      unset($_COOKIE['useremail']);
      unset($_COOKIE['codeconfirmed']);
      setcookie('useremail', '', time() - 3600, '/');
      setcookie('codeconfirmed', '', time() - 3600, '/');

      wp_safe_redirect(get_permalink($post->ID));
    }
  }
);

require_once(dirname(__FILE__) . '/generalfields.php');
require_once(dirname(__FILE__) . '/mail.php');
require_once(dirname(__FILE__) . '/page.php');
require_once(dirname(__FILE__) . '/admin.php');
require_once(dirname(__FILE__) . '/updateprices.php');
require_once(dirname(__FILE__) . '/access.php');
require_once(dirname(__FILE__) . '/initplugin.php');