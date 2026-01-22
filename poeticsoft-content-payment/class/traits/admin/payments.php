<?php

trait PCPT_Admin_Payments {   

  public function register_pcpt_admin_payments() {

    add_action( 
      'admin_menu', 
      function () { 

        add_submenu_page(
          'poeticsoft', 
          'Pagos',
          'Pagos',
          'manage_options',
          'pcpt_payments',
          [$this, 'admin_payments_render']
        );
      }
    ); 

    add_action( 
      'admin_enqueue_scripts', 
      function () {

        $screen = get_current_screen();

        if (
          $screen 
          && 
          ($screen->id === 'poeticsoft_page_pcpt_payments') 
        ) {  

          wp_enqueue_script(
            'poeticsoft-content-payment-admin-payments', 
            self::$url . 'ui/admin/payments/main.js',
            [
              'wp-blocks',
              'wp-block-editor',
              'wp-element',
              'wp-components',
              'wp-data',
              'wp-hooks',
              'lodash'
            ], 
            filemtime(self::$dir . 'ui/admin/payments/main.js'),
            true
          );

          wp_enqueue_style( 
            'poeticsoft-content-payment-admin-payments',
            self::$url . 'ui/admin/payments/main.css', 
            [], 
            filemtime(self::$dir . 'ui/admin/payments/main.css'),
            'all' 
          );
        }
      } 
    );
  }

  public function admin_payments_render() {

    echo '<div
      id="pcpt_admin_payments"
      class="wrap"
    >
      <h1>Pagos</h1>
      <div id="PaymentsAPP"></div>
    </div>';
  }
}