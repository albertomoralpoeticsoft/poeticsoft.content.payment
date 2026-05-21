<?php

/**
 *
 * Plugin Name: Poeticsoft Heart Campus
 * Plugin URI: http://poeticsoft.com/plugins/poeticsoft-heart-campus
 * Description: Tools for manage a wordpress pages based campus
 * Version: 0.0.0
 * Author: Poeticsoft Team
 * License: GPL-3.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Author URI: http://poeticsoft.com/team
 * MIT License: https://opensource.org/licenses/MIT
 */

if (!defined('ABSPATH')) {
    exit;
}

$poeticsoftHeartCampusAutoload = __DIR__ . '/vendor/autoload.php';

if (file_exists($poeticsoftHeartCampusAutoload)) {
    require_once $poeticsoftHeartCampusAutoload;
} else {
    spl_autoload_register(
        static function ($class) {
            $prefix = 'Poeticsoft\\Heart\\';
            $baseDir = __DIR__ . '/class/';

            if (strncmp($class, $prefix, strlen($prefix)) !== 0) {
                return;
            }

            $relativeClass = substr($class, strlen($prefix));
            $file = $baseDir . str_replace('\\', DIRECTORY_SEPARATOR, $relativeClass) . '.php';

            if (file_exists($file)) {
                require_once $file;
            }
        }
    );
}

add_action(
    'init',
    static function () {
        \Poeticsoft\Heart\Campus::instance(__FILE__)->initialize();
    },
    20
);

register_activation_hook(
    __FILE__,
    static function () {
        \Poeticsoft\Heart\Campus::instance(__FILE__)->activate();
    }
);

register_deactivation_hook(
    __FILE__,
    static function () {
        \Poeticsoft\Heart\Campus::instance(__FILE__)->deactivate();
    }
);
