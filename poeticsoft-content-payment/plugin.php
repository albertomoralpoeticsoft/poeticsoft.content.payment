<?php

/**
 *
 * Plugin Name: Poetic Soft Content Payments
 * Plugin URI: http://poeticsoft.com/plugins/poeticsoft-content-payment
 * Description: Tools for selling content with external payments & no dependencies
 * Version: 0.0.0
 * Author: Poeticsoft Team
 * Author URI: http://poeticsoft.com/team
 */

if (! defined('ABSPATH')) { exit; }

require __DIR__ . '/tools/plugin-update-checker/plugin-update-checker.php';

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

add_action( 
  'admin_init',
  function () {

    if (!class_exists('Poeticsoft_Base')) {

      add_action(
        'admin_notices',
        function () {

          echo '<div class="notice notice-error"><p>
              [Poeticsoft Content Payment] - Este plugin requiere el plugin Poeticsoft_Base activo.
          </p></div>';
        }
      );

      deactivate_plugins(plugin_basename(__FILE__));      
    }
  }
);

register_activation_hook( 
  __FILE__, 
  function () {

    if (!class_exists('Poeticsoft_Base')) {

      deactivate_plugins( plugin_basename( __FILE__ ) );

      wp_die(
          '[Poeticsoft Content Payment] - Este plugin requiere el plugin Poeticsoft_Base activo.',
          'Dependencia faltante',
          [ 'back_link' => true ]
      );

    } else {

      require_once __DIR__ . '/setup/initplugin.php';

      poeticsoft_content_payment_initplugin();
    }
  } 
);

if (class_exists('Poeticsoft_Base')) {

  $myUpdateChecker = PucFactory::buildUpdateChecker(
    'https://poeticsoft.com/plugins/poeticsoft-content-payment/poeticsoft-content-payment.json',
    __FILE__,
    'poeticsoft-content-payment'
  );

  require_once __DIR__ . '/class/poeticsoft-content-payment.php';

  Poeticsoft_Content_Partner::get_instance();
}