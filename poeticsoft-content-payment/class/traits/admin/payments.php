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
          'poeticsoft_payments',
          [$this, 'admin_payments_render']
        );
      }
    ); 
  }

  public function admin_payments_render() {
    
    global $wpdb;

    if (!class_exists('PCPT_Admin_Payments_Table')) {
      
      require_once __DIR__ . '/payments-table.php';
    }

    $table_name = $wpdb->prefix . 'payment_pays';
    $data = $wpdb->get_results(
      "SELECT " . 
      "user_mail, " .
      "post_id, " .
      "type, " .
      "mode, " .
      "price, " .
      "creation_date, " .
      "confirm_pay_date " . 
      "FROM $table_name", 
      ARRAY_A
    );
    $payments_table = new PCPT_Admin_Payments_Table($data);
    $payments_table->prepare_items();

    echo '<div class="wrap"><h1>Pagos</h1>';
      $payments_table->display();
    echo '</div>';
  }
}