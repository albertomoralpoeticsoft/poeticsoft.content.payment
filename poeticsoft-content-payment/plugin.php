<?php

/**
 *
 * Plugin Name: Poetic Soft Content Payments
 * Plugin URI: http://poeticsoft.com/plugins/poeticsoft-content-payment
 * Description: Tools for selling content with external payments & no dependencies
 * Version: 0.00
 * Author: Poeticsoft Team
 * Author URI: http://poeticsoft.com/team
 */
  
require_once(dirname(__FILE__) . '/stripe/main.php'); 
require_once(dirname(__FILE__) . '/setup/main.php'); 
require_once(dirname(__FILE__) . '/api/main.php');  
require_once(dirname(__FILE__) . '/core/main.php');
require_once(dirname(__FILE__) . '/block/main.php');
require_once(dirname(__FILE__) . '/ui/main.php');

register_activation_hook(
  __FILE__,
  'poeticsoft_content_payment_initplugin'
);