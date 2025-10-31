<?php

function poeticsoft_content_payment_initplugin (){

  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

  global $wpdb;

  $charset_collate = $wpdb->get_charset_collate();
  $tablename = $wpdb->prefix . 'payment_pays';
  $tableexists = $wpdb->get_var("SHOW TABLES LIKE '$tablename'");

  if(!$tableexists) {

    // Mode -> payment, subscription o setup
    // Type -> stripe, bizum o transfer
    // Currency -> usd, eur

    $wpdb->query(
      "CREATE TABLE IF NOT EXISTS $tablename (
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
      ) $charset_collate;"
    );
    $result = dbDelta();
  };
}