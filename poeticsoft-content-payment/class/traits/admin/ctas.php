<?php

trait PCPT_Admin_CTAS {   

  public function register_pcpt_admin_ctas() {

    add_action( 
      'admin_menu', 
      function () { 

        add_submenu_page(
          'poeticsoft', 
          'CTAs',
          'CTAs',
          'manage_options',
          'poeticsoft_ctas',
          [$this, 'admin_ctas_render']
        );
      }
    ); 
  }

  public function admin_ctas_render() {
    
    global $wpdb;

    if (!class_exists('PCPT_Admin_Ctas_Table')) {
      
      require_once __DIR__ . '/ctas-table.php';
    }

    $table_name = $wpdb->prefix . 'payment_ctas';
    $data = $wpdb->get_results(
      "SELECT " . 
      "post_id, " .
      "target_id, " .
      "buttontext, " .
      "discount " . 
      "FROM $table_name", 
      ARRAY_A
    );
    $ctas_table = new PCPT_Admin_Ctas_Table($data);
    $ctas_table->prepare_items();

    echo '<div class="wrap"><h1>CTAs</h1>';
      $ctas_table->display();
    echo '</div>';
  }
}