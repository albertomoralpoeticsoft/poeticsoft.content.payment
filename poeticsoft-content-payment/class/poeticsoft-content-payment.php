<?php

require_once __DIR__ . '/traits/utils/all.php';
require_once __DIR__ . '/traits/admin/setup.php';
require_once __DIR__ . '/traits/admin/sections.php';
require_once __DIR__ . '/traits/admin/fields-campus.php';
require_once __DIR__ . '/traits/admin/fields-gclient.php';
require_once __DIR__ . '/traits/admin/fields-mailrelay.php';
require_once __DIR__ . '/traits/admin/fields-stripe.php';
require_once __DIR__ . '/traits/admin/fields.php';   
require_once __DIR__ . '/traits/admin/calendar.php';   
require_once __DIR__ . '/traits/admin/pageprice.php';   
require_once __DIR__ . '/traits/admin/pageslist.php';    
require_once __DIR__ . '/traits/admin/pageinitdate.php';   
require_once __DIR__ . '/traits/admin/payments.php';    
require_once __DIR__ . '/traits/admin/ctas.php';
require_once __DIR__ . '/traits/api/api.php';
require_once __DIR__ . '/traits/api/maintenance.php';
require_once __DIR__ . '/traits/api/mail.php';
require_once __DIR__ . '/traits/api/price.php';
require_once __DIR__ . '/traits/api/price-update.php';
require_once __DIR__ . '/traits/api/identify.php';
require_once __DIR__ . '/traits/api/identify-mailrelay.php';
require_once __DIR__ . '/traits/api/identify-gsheets.php';
require_once __DIR__ . '/traits/api/pay.php';
require_once __DIR__ . '/traits/api/pay-stripe.php';
require_once __DIR__ . '/traits/api/pay-register.php';
require_once __DIR__ . '/traits/api/pay-notify.php';
require_once __DIR__ . '/traits/api/campus.php';
require_once __DIR__ . '/traits/api/campus-calendar.php';
require_once __DIR__ . '/traits/api/campus-payments.php';
require_once __DIR__ . '/traits/api/campus-relatedpages.php';
require_once __DIR__ . '/traits/campus/access.php'; 
require_once __DIR__ . '/traits/campus/page.php'; 
require_once __DIR__ . '/traits/mail/config.php';
require_once __DIR__ . '/traits/blocks/blocks.php';
require_once __DIR__ . '/traits/blocks/postcontent.php';
require_once __DIR__ . '/traits/gclient/sheets.php';

class Poeticsoft_Content_Payment {  

  use PCP_Utils_All;
  use PCP_Admin_Setup;
  use PCP_Admin_Sections;
  use PCP_Admin_Fields_Campus;
  use PCP_Admin_Fields_GClient;
  use PCP_Admin_Fields_Mailrelay;
  use PCP_Admin_Fields_Stripe;
  use PCP_Admin_Fields;
  use PCP_Admin_Calendar;
  use PCP_Admin_Pageprice;
  use PCP_Admin_Pageslist;
  use PCP_Admin_PageInitdate;
  use PCP_Admin_Payments;
  use PCP_Admin_CTAS;
  use PCP_API;
  use PCP_API_Maintenance;
  use PCP_API_Mail;
  use PCP_API_Price;
  use PCP_API_Price_Update;
  use PCP_API_Identify;
  use PCP_API_Identify_MailRelay;
  use PCP_API_Identify_GSheets;
  use PCP_API_Pay;
  use PCP_API_Pay_Stripe;
  use PCP_API_Pay_Register;
  use PCP_API_Pay_Notify;
  use PCP_API_Campus;
  use PCP_API_Campus_Calendar;
  use PCP_API_Campus_Payments;
  use PCP_API_Campus_RelatedPages;
  use PCP_Campus_Access;
  use PCP_Campus_Page;
  use PCP_Mail_Config;
  use PCP_Blocks;
  use PCP_Blocks_Postcontent;
  use PCP_GClient_Sheets;

  private static $instance = null;
  public static $dir;
  public static $url;
  public static $adminsections;
  public static $adminfields;

  private function __construct() {

    $this->set_vars(); 
    $this->register_pcp_admin_setup();
    $this->register_pcp_admin_sections();
    $this->register_pcp_admin_fields_campus();
    $this->register_pcp_admin_fields_gclient();
    $this->register_pcp_admin_fields_mailrelay();
    $this->register_pcp_admin_fields_stripe();
    $this->register_pcp_admin_fields();     
    $this->register_pcp_admin_calendar(); 
    $this->register_pcp_admin_pageprice(); 
    $this->register_pcp_admin_pageslist();  
    $this->register_pcp_admin_pageinitdate(); 
    $this->register_pcp_admin_payments(); 
    $this->register_pcp_admin_ctas();
    $this->register_pcp_api(); 
    $this->register_pcp_api_maintenance(); 
    $this->register_pcp_api_mail(); 
    $this->register_pcp_api_price();
    $this->register_pcp_api_identify(); 
    $this->register_pcp_api_pay();  
    $this->register_pcp_api_pay_stripe(); 
    $this->register_pcp_api_campus(); 
    $this->register_pcp_api_campus_calendar();
    $this->register_pcp_api_campus_payments();
    $this->register_pcp_api_campus_relatedpages();
    $this->register_pcp_mail_config(); 
    $this->register_pcp_campus_access(); 
    $this->register_pcp_campus_page();
    $this->register_pcp_blocks(); 
    $this->register_pcp_blocks_postcontent(); 
    $this->register_pcp_gclient_sheets(); 
  }
}

