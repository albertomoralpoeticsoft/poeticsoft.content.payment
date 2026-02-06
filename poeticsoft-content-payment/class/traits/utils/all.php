<?php

trait PCP_Utils_All {

  public static function get_instance() { 

    if (self::$instance === null) {

      self::$instance = new self();
    }

    return self::$instance;
  }

  private function set_vars() {

    self::$dir = WP_PLUGIN_DIR . '/poeticsoft-content-payment/';
    self::$url = WP_PLUGIN_URL . '/poeticsoft-content-payment/';
    self::$adminsections = [];
    self::$adminfields = [];
    self::$availableblocks = [
      // 'breadcrumbs',
      'campusbreadcrumbs',
      'campuscontainerchildren',
      'campusrelatedcontent',
      'campustreenav',
      'columntools',
      // 'ctacampus',
      // 'insertpage',
      // 'mycampus',
      'mytools',
      // 'pagecontext',
      // 'pagenav',
      'price',
      // 'treenav'
    ];
  }

  public function log($display, $withdate = false) { 

    $text = is_string($display) ? 
    $display 
    : 
    json_encode($display, JSON_PRETTY_PRINT);

    $message = $withdate ? 
    date("d-m-y h:i:s") . PHP_EOL
    :
    '';

    $message .= $text . PHP_EOL;

    file_put_contents(
      self::$dir . '/log.txt',
      $message,
      FILE_APPEND
    );
  }

  public function iso_to_mysql($iso) {

    return $iso ? 
    gmdate('Y-m-d H:i:s', strtotime($iso))
    : 
    null;
  }

  public function mysql_to_iso($datetime) {

    return gmdate('c', strtotime($datetime));
  }

  private function get_pcp_option ($optionname) {


  }

  private function get_campus_root_id() {

    if(self::$campus_root_id === null) {

      self::$campus_root_id = intval(get_option('pcp_settings_campus_root_post_id'));
    }

    return self::$campus_root_id;
  }

  private function get_allow_admin() {

    if(self::$allow_admin === null) {

      self::$allow_admin = get_option('pcp_settings_campus_roles_access', false);
    }

    return self::$allow_admin;
  }

  private function get_subscription_duration() {

    if(self::$subscription_duration === null) {

      self::$subscription_duration = intval(get_option('pcp_settings_campus_suscription_duration'));
    }

    return self::$subscription_duration;
  }

  private function get_access_by() {

    if(self::$access_by === null) {

      self::$access_by = get_option('pcp_settings_campus_access_by');
    }

    return self::$access_by;
  }

  private function get_use_temporal_code() {

    if(self::$use_temporal_code === null) {

      self::$use_temporal_code = get_option('pcp_settings_campus_use_temporalcode');
    }

    return self::$use_temporal_code;
  }
}