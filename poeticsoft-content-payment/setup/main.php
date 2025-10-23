<?php

add_action(
  'init',
  function () {
     
    add_post_type_support( 'page', 'excerpt' );
  }
);

require_once(dirname(__FILE__) . '/generalfields.php');
require_once(dirname(__FILE__) . '/mail.php');
require_once(dirname(__FILE__) . '/page.php');
require_once(dirname(__FILE__) . '/admin.php');
