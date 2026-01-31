<?php

trait PCP_Admin_Calendar {   

  public function register_pcp_admin_calendar() {

    add_action( 
      'admin_menu', 
      function () { 

        add_submenu_page(
          'poeticsoft', 
          'Calendario',
          'Calendario',
          'manage_options',
          'pcp_calendar',
          [$this, 'admin_calendar_render']
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
          ($screen->id === 'poeticsoft_page_pcp_calendar')
        ) { 

          wp_enqueue_script(
            'poeticsoft-content-payment-admin-calendar', 
            self::$url . 'ui/admin/calendar/main.js',
            [
              'jquery',
              'wp-blocks',
              'wp-block-editor',
              'wp-element',
              'wp-components',
              'wp-data',
              'wp-hooks',
              'lodash'
            ], 
            filemtime(self::$dir . 'ui/admin/calendar/main.js'),
            true
          );

          wp_enqueue_style( 
            'poeticsoft-content-payment-admin-calendar',
            self::$url . 'ui/admin/calendar/main.css', 
            [], 
            filemtime(self::$dir . 'ui/admin/calendar/main.css'),
            'all' 
          );   
        }
      } 
    );
  }

  public function admin_calendar_render() {
    
    global $wpdb;

    echo '<div 
      id="pcp_admin_calendar" 
      class="wrap"
    >
      <h1>Calendario</h1>
      <div id="CalendarWrapper"></div>
    </div>';
  }
}