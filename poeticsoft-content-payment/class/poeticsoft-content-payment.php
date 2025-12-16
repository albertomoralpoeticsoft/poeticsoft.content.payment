<?php

require_once __DIR__ . '/traits/utils/all.php';
require_once __DIR__ . '/traits/admin/sections.php';
require_once __DIR__ . '/traits/admin/fields-mailrelay.php';
require_once __DIR__ . '/traits/admin/fields-stripe.php';
require_once __DIR__ . '/traits/admin/fields-campus.php';
require_once __DIR__ . '/traits/admin/fields.php'; 

class Poeticsoft_Content_Partner {  

  use PCPT_Utils_All;
  use PCPT_Admin_Sections;
  use PCPT_Admin_Fields_Mailrelay;
  use PCPT_Admin_Fields_Stripe;
  use PCPT_Admin_Fields_Campus;
  use PCPT_Admin_Fields;

  private static $instance = null;
  public static $dir;
  public static $url;
  public static $adminsections;
  public static $adminfields;

  private function __construct() { 

    $this->set_vars(); 

    $this->register_pcpt_admin_sections();
    $this->register_pcpt_admin_fields_mailrelay();
    $this->register_pcpt_admin_fields_stripe();
    $this->register_pcpt_admin_fields_campus();
    $this->register_pcpt_admin_fields(); 
  }
}