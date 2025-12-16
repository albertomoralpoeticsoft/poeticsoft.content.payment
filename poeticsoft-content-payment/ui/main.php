<?php

add_action(
  'init', 
  function() {

    $uidir = __DIR__;
    $uinames = array_diff(
      scandir($uidir),
      [ 
        '.',
        '..',
        'main.php',
        'main.js'
      ]
    );

    wp_enqueue_script(
      'poeticsoft-content-payment-ui', 
      WP_PLUGIN_URL . '/poeticsoft-content-payment/ui/main.js',
      [], 
      filemtime(WP_PLUGIN_DIR . '/poeticsoft-content-payment/ui/main.js'),
      true
    );

    foreach($uinames as $key => $uiname) { 

      wp_enqueue_script(
        'poeticsoft-content-payment-ui-' . $uiname, 
        WP_PLUGIN_URL . '/poeticsoft-content-payment/ui/' . $uiname . '/main.js',
        [
          'jquery'
        ], 
        filemtime(WP_PLUGIN_DIR . '/poeticsoft-content-payment/ui/' . $uiname . '/main.js'),
        true
      );

      wp_enqueue_style( 
        'poeticsoft-content-payment-ui-' . $uiname,
        WP_PLUGIN_URL . '/poeticsoft-content-payment/ui/' . $uiname . '/main.css', 
        [
          'wp-block-library',
          'wp-block-library-theme'
        ], 
        filemtime(WP_PLUGIN_DIR . '/poeticsoft-content-payment/ui/' . $uiname . '/main.css'),
        'all' 
      );
    }
  },
  5
);