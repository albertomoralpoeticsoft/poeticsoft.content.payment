<?php

require_once __DIR__ . '/traits/utils/all.php';
require_once __DIR__ . '/traits/admin/sections.php';
require_once __DIR__ . '/traits/admin/fields-mailrelay.php';
require_once __DIR__ . '/traits/admin/fields-stripe.php';
require_once __DIR__ . '/traits/admin/fields-campus.php';
require_once __DIR__ . '/traits/admin/fields.php';   
require_once __DIR__ . '/traits/admin/calendar.php';   
require_once __DIR__ . '/traits/admin/pageprice.php';   
require_once __DIR__ . '/traits/admin/pageslist.php';    
require_once __DIR__ . '/traits/admin/pageinitdate.php';   
require_once __DIR__ . '/traits/admin/payments.php';    
require_once __DIR__ . '/traits/admin/ctas.php';
require_once __DIR__ . '/traits/api/api.php';
require_once __DIR__ . '/traits/api/mail.php';
require_once __DIR__ . '/traits/api/price.php';
require_once __DIR__ . '/traits/api/price-update.php';
require_once __DIR__ . '/traits/api/identify.php';
require_once __DIR__ . '/traits/api/pay.php';
require_once __DIR__ . '/traits/api/pay-stripe.php';
require_once __DIR__ . '/traits/api/pay-register.php';
require_once __DIR__ . '/traits/api/pay-notify.php';
require_once __DIR__ . '/traits/api/campus.php';
require_once __DIR__ . '/traits/api/campus-calendar.php';
require_once __DIR__ . '/traits/api/campus-payments.php';
require_once __DIR__ . '/traits/campus/access.php'; 
require_once __DIR__ . '/traits/campus/page.php'; 
require_once __DIR__ . '/traits/mail/config.php';
require_once __DIR__ . '/traits/blocks/blocks.php';
require_once __DIR__ . '/traits/blocks/postcontent.php';

class Poeticsoft_Content_Partner {  

  use PCPT_Utils_All;
  use PCPT_Admin_Sections;
  use PCPT_Admin_Fields_Mailrelay;
  use PCPT_Admin_Fields_Stripe;
  use PCPT_Admin_Fields_Campus;
  use PCPT_Admin_Fields;
  use PCPT_Admin_Calendar;
  use PCPT_Admin_Pageprice;
  use PCPT_Admin_Pageslist;
  use PCPT_Admin_PageInitdate;
  use PCPT_Admin_Payments;
  use PCPT_Admin_CTAS;
  use PCPT_API;
  use PCPT_API_Mail;
  use PCPT_API_Price;
  use PCPT_API_Price_Update;
  use PCPT_API_Identify;
  use PCPT_API_Pay;
  use PCPT_API_Pay_Stripe;
  use PCPT_API_Pay_Register;
  use PCPT_API_Pay_Notify;
  use PCPT_API_Campus;
  use PCPT_API_Campus_Calendar;
  use PCPT_API_Campus_Payments;
  use PCPT_Campus_Access;
  use PCPT_Campus_Page;
  use PCPT_Mail_Config;
  use PCPT_Blocks;
  use PCPT_Blocks_Postcontent;

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
    $this->register_pcpt_admin_calendar(); 
    $this->register_pcpt_admin_pageprice(); 
    $this->register_pcpt_admin_pageslist();  
    $this->register_pcpt_admin_pageinitdate(); 
    $this->register_pcpt_admin_payments(); 
    $this->register_pcpt_admin_ctas();
    $this->register_pcpt_api(); 
    $this->register_pcpt_api_mail(); 
    $this->register_pcpt_api_price();
    $this->register_pcpt_api_identify(); 
    $this->register_pcpt_api_pay();  
    $this->register_pcpt_api_pay_stripe(); 
    $this->register_pcpt_api_campus(); 
    $this->register_pcpt_api_campus_calendar();
    $this->register_pcpt_api_campus_payments();
    $this->register_pcpt_mail_config(); 
    $this->register_pcpt_campus_access(); 
    $this->register_pcpt_campus_page();
    $this->register_pcpt_blocks(); 
    $this->register_pcpt_blocks_postcontent(); 
  }
}

