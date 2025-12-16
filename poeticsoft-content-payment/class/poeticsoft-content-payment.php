<?php

require_once __DIR__ . '/traits/utils/all.php';
require_once __DIR__ . '/traits/admin/sections.php';
require_once __DIR__ . '/traits/admin/fields-mailrelay.php';
require_once __DIR__ . '/traits/admin/fields-stripe.php';
require_once __DIR__ . '/traits/admin/fields-campus.php';
require_once __DIR__ . '/traits/admin/fields.php';  
require_once __DIR__ . '/traits/admin/pageslist.php'; 
require_once __DIR__ . '/traits/campus/access.php'; 
require_once __DIR__ . '/traits/campus/page.php'; 
require_once __DIR__ . '/traits/mail/config.php';

class Poeticsoft_Content_Partner {  

  use PCPT_Utils_All;
  use PCPT_Admin_Sections;
  use PCPT_Admin_Fields_Mailrelay;
  use PCPT_Admin_Fields_Stripe;
  use PCPT_Admin_Fields_Campus;
  use PCPT_Admin_Fields;
  use PCPT_Admin_Pageslist;
  use PCPT_Campus_Access;
  use PCPT_Campus_Page;
  use PCPT_Mail_Config;

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
    $this->register_pcpt_admin_pageslist();
    $this->register_pcpt_mail_config(); 
    $this->register_pcpt_campus_access(); 
    $this->register_pcpt_campus_page();
  }
}