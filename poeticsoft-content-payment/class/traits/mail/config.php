<?php

trait PCPT_Mail_Config {
  
  public function register_pcpt_mail_config() { 

    add_action(
      'phpmailer_init', 
      function($phpmailer) {

        $useexternalsmtpserver = get_option('poeticsoft_content_payment_settings_external_smtp', false);

        if($useexternalsmtpserver) {

          $mail_host = get_option('poeticsoft_content_payment_settings_mail_host');
          $mail_port = get_option('poeticsoft_content_payment_settings_mail_port');
          $mail_smtpsecure = get_option('poeticsoft_content_payment_settings_mail_smtpsecure');
          $mail_username = get_option('poeticsoft_content_payment_settings_mail_username');
          $mail_password = get_option('poeticsoft_content_payment_settings_mail_password');
          $mail_from = get_option('poeticsoft_content_payment_settings_mail_from');
          $mail_fromname = get_option('poeticsoft_content_payment_settings_mail_fromname');

          $phpmailer->isSMTP();
          $phpmailer->SMTPAuth = true;
          $phpmailer->SMTPSecure = $mail_smtpsecure;
          $phpmailer->Port = $mail_port;
          $phpmailer->Host = $mail_host;
          $phpmailer->Username = $mail_username;
          $phpmailer->Password = $mail_password;
          $phpmailer->From = $mail_from;
          $phpmailer->FromName = $mail_fromname;    
          $phpmailer->isHTML(true);
        }
      }
    );

    add_action(
      'wp_mail_failed',
      function ($wp_error) {

        error_log('wp_mail_failed');
        error_log(json_encode($wp_error));   
        error_log('host: ' . get_option('poeticsoft_content_payment_settings_mail_host'));
        error_log('port: ' . get_option('poeticsoft_content_payment_settings_mail_port'));
        error_log('smtpsecure: ' . get_option('poeticsoft_content_payment_settings_mail_smtpsecure'));
        error_log('username: ' . get_option('poeticsoft_content_payment_settings_mail_username'));
        error_log('password: ' . get_option('poeticsoft_content_payment_settings_mail_password'));
        error_log('from: ' . get_option('poeticsoft_content_payment_settings_mail_from'));
        error_log('fromname: ' . get_option('poeticsoft_content_payment_settings_mail_fromname'));
      } ,
      10, 
      1 
    );
  }
}