<?php

/**
 *
 * Plugin Name: Poetic Soft Content Payments
 * Plugin URI: http://poeticsoft.com/plugins/poeticsoft-content-payment
 * Description: Tools for selling content with external payments & no dependencies
 * Version: 0.0.0
 * Author: Poeticsoft Team
 * License: GPL-3.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Author URI: http://poeticsoft.com/team
 * Este plugin incluye la librería @fullcalendar bajo licencia MIT:
 * Copyright (c) 2021 Adam Shaw
 * MIT License: https://opensource.org/licenses/MIT
 */

if (! defined('ABSPATH')) { exit; }

require __DIR__ . '/tools/plugin-update-checker/plugin-update-checker.php';
require_once __DIR__ . '/class/poeticsoft-content-payment.php';

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

add_action(
  'init', 
  function () {

    include_once ABSPATH . 'wp-admin/includes/plugin.php';
    
    if ( ! class_exists('Poeticsoft_Base') ) {

      deactivate_plugins(plugin_basename(__FILE__));
      
      wp_die(
          '[Poeticsoft Content Payment] requiere Poeticsoft_Base activo.',
          'Plugin no activado',
          array('back_link' => true)
      );
    }

    $myUpdateChecker = PucFactory::buildUpdateChecker(
      'https://poeticsoft.com/plugins/poeticsoft-content-payment/poeticsoft-content-payment.json',
      __FILE__,
      'poeticsoft-content-payment'
    ); 
    
    Poeticsoft_Content_Payment::get_instance();
  }
);

register_activation_hook(
  __FILE__, 
  function () {

    include_once ABSPATH . 'wp-admin/includes/plugin.php';
    
    if ( ! class_exists('Poeticsoft_Base') ) {

      deactivate_plugins(plugin_basename(__FILE__));
      
      wp_die(
          '[Poeticsoft Content Payment] requiere Poeticsoft_Base activo.',
          'Plugin no activado',
          array('back_link' => true)
      );
    }

    Poeticsoft_Content_Payment::get_instance()->admin_setup_initplugin();
  }
);

register_deactivation_hook(
  __FILE__, 
  function () {
    
    Poeticsoft_Content_Payment::get_instance()->admin_setup_endplugin();
  }
);