<?php

add_action( 
	'admin_enqueue_scripts', 
	function () {

    wp_enqueue_script(
      'poeticsoft-content-payment-admin', 
      WP_PLUGIN_URL . '/poeticsoft-content-payment/admin/main.js',
      [
        'jquery'
      ], 
      filemtime(WP_PLUGIN_DIR . '/poeticsoft-content-payment/admin/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-content-payment-admin',
      WP_PLUGIN_URL . '/poeticsoft-content-payment/admin/main.css', 
      [
        'wp-block-library',
        'wp-block-library-theme'
      ], 
      filemtime(WP_PLUGIN_DIR . '/poeticsoft-content-payment/admin/main.css'),
      'all' 
    );
	}, 
	15 
);