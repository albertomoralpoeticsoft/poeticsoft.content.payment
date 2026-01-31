<?php

trait PCP_Admin_Setup {
  
  public function register_pcp_admin_setup() {

    add_action(
      'pcp_cron_fifteen_minutes', 
      array($this, 'pcp_cron_fifteen_minutes')
    );

    add_filter(
      'cron_schedules', 
      function ($schedules) {

        $schedules['fifteen_minutes'] = array(
          'interval' => 900, // segundos
          'display'  => __('Cada 15 minutos')
        );

        return $schedules;
      }
    );
  }

  public function admin_setup_initplugin (){

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();

    /* Payments Table */

    $tablename = $wpdb->prefix . 'payment_pays';
    $tableexists = $wpdb->get_var("SHOW TABLES LIKE '$tablename'");
    if(!$tableexists) {

      // Mode -> payment, subscription o setup
      // Type -> stripe, bizum o transfer
      // Currency -> usd, eur

      $sql = "CREATE TABLE IF NOT EXISTS $tablename (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        user_mail VARCHAR(255) NOT NULL,
        post_id BIGINT(20) UNSIGNED NOT NULL,
        type VARCHAR(10), 
        mode VARCHAR(50) DEFAULT 'payment',
        price DECIMAL(10,2) DEFAULT 0,
        currency VARCHAR(10) DEFAULT 'eur',
        stripe_session_id VARCHAR(256),
        stripe_session_result VARCHAR(256),
        creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        confirm_pay_date DATETIME DEFAULT NULL,
        last_access_date DATETIME DEFAULT NULL,
        PRIMARY KEY (id),
        KEY post_id (post_id),
        KEY user_mail (user_mail)
      ) $charset_collate;";
      dbDelta($sql);
    };

    /* CTAs Table */

    $tablename = $wpdb->prefix . 'payment_ctas';
    $tableexists = $wpdb->get_var("SHOW TABLES LIKE '$tablename'");
    if(!$tableexists) {

      $sql = "CREATE TABLE IF NOT EXISTS $tablename (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        post_id BIGINT(20) UNSIGNED NOT NULL,
        block_id VARCHAR(50) NOT NULL,
        target_id BIGINT(20) UNSIGNED NOT NULL,
        buttontext TEXT NOT NULL DEFAULT '',
        content LONGTEXT NOT NULL DEFAULT '',
        discount DECIMAL(10,2) DEFAULT 0.00,
        PRIMARY KEY (id),
        KEY post_id (post_id),
        KEY target_id (target_id)
      ) $charset_collate;";
      dbDelta($sql);
    };

    /* Calendar Tables */

    $tablename = $wpdb->prefix . 'campus_calendar_groups';
    $tableexists = $wpdb->get_var("SHOW TABLES LIKE '$tablename'");
    if(!$tableexists) {

      $sql = "CREATE TABLE IF NOT EXISTS $tablename (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        color VARCHAR(255)
      ) $charset_collate;";
      dbDelta($sql);
    };

    $tablename = $wpdb->prefix . 'campus_calendar_events';
    $tableexists = $wpdb->get_var("SHOW TABLES LIKE '$tablename'");
    if(!$tableexists) {

      $sql = "CREATE TABLE IF NOT EXISTS $tablename (
        id INT AUTO_INCREMENT PRIMARY KEY,
        eventsgroup BIGINT(20) UNSIGNED,
        title VARCHAR(255) NOT NULL,
        start DATETIME NOT NULL,
        end DATETIME DEFAULT NULL,
        allDay TINYINT(1) DEFAULT 0,
        rrule TEXT DEFAULT NULL,
        exdate TEXT DEFAULT NULL,
        postid BIGINT(20) UNSIGNED
      ) $charset_collate;";
      dbDelta($sql);
    };

    if (!wp_next_scheduled('pcp_cron_fifteen_minutes')) {
        
      wp_schedule_event(
        time(),
        'fifteen_minutes', 
        'pcp_cron_fifteen_minutes'
      );
    }
  }  

  public function admin_setup_endplugin () {

    wp_clear_scheduled_hook('pcp_cron_fifteen_minutes');
  }

  public function pcp_cron_fifteen_minutes() {

    // $this->admin_payments_update_payments();
  }
}
