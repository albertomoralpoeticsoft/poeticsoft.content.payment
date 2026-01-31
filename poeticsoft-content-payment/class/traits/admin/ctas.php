<?php

trait PCP_Admin_CTAS {   

  public function register_pcp_admin_ctas() {

    add_action( 
      'admin_menu', 
      function () { 

        add_submenu_page(
          'poeticsoft', 
          'CTAs',
          'CTAs',
          'manage_options',
          'pcp_ctas',
          [$this, 'admin_ctas_render']
        );
      }
    ); 
  }

  public function admin_ctas_render() {
    
    global $wpdb;

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

    echo '<div       
      id="pcp_admin_calendar"
      class="wrap"
    >
      <h1>CTAs</h1>' .
    '</div>';
  }
}