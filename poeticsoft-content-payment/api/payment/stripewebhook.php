<?php

function poeticsoft_content_payment_stripe_webhook_events_session_success($sessionid) {

  global $wpdb;

  $tablename = $wpdb->prefix . 'payment_pays';
  $payexists = $wpdb->get_results("
    SELECT * 
    FROM {$tablename}
    WHERE stripe_session_id='{$sessionid}';
  ");

  if(count($payexists)) {

    $id = intval($payexists[0]->id);
    $rowdata = [
      'confirm_pay_date' => current_time('mysql'),
      'stripe_session_result' => 'success'
    ];
    $rowformat = [
      '%s',
      '%s'
    ];
    $where = [
      'id' => $id
    ];
    $where_format = ['%d'];
    $data['payupdated'] = $wpdb->update(
      $tablename, 
      $rowdata, 
      $where, 
      $rowformat, 
      $where_format
    );
  }
}

function poeticsoft_content_payment_stripe_webhook_events_session_cancel() {

  global $wpdb;

  $tablename = $wpdb->prefix . 'payment_pays';
  $payexists = $wpdb->get_results("
    SELECT * 
    FROM {$tablename}
    WHERE stripe_session_id='{$sessionid}';
  ");

  if(count($payexists)) {

    $id = intval($payexists[0]->id);
    $rowdata = [
      'stripe_session_result' => 'cancel'
    ];
    $rowformat = [
      '%s'
    ];
    $where = [
      'id' => $id
    ];
    $where_format = ['%d'];
    $data['payupdated'] = $wpdb->update(
      $tablename, 
      $rowdata, 
      $where, 
      $rowformat, 
      $where_format
    );
  }  
}

function poeticsoft_content_payment_stripe_webhook_events(WP_REST_Request $req) { 
    
  // require_once(WP_PLUGIN_DIR . '/poeticsoft-content-payment/tools/stripe/vendor/autoload.php');
      

  // try {  

  //   $stripesecretkey = get_option('poeticsoft_content_payment_settings_stripe_secret_key');
  //   $stripesignaturekey = get_option('poeticsoft_content_payment_settings_stripe_signature_key');
    
  //   \Stripe\Stripe::setApiKey($stripesecretkey);

  //   $payload = $req->get_body();
  //   $sigheader = $req->get_header('stripe-signature')[0] ?? ''; 

  //   $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $stripesignaturekey);

  //   

  //   $res->set_status(200);
  
  // } catch (Exception $e) {
    
  //   $res->set_status(500);
  // }

  stripe_log('EVENTO ! ------------------------------------------------------------');
  stripe_log($req->get_body());
  
  $res = new WP_REST_Response();
  $res->set_status(200);
  return $res;
}

/* -------------------------------------------------------------------------------------
  Simulacion Webhook basado en url
  ?stripe_session_success_id={CHECKOUT_SESSION_ID}
  ?stripe_session_cancel_id={CHECKOUT_SESSION_ID}
*/

add_action(
  'init',
  function () {

    $success = 'stripe_session_success_id';
    $cancel = 'stripe_session_cancel_id';

    if (isset($_GET[$success])) {

      $sessionid = sanitize_text_field(wp_unslash($_GET[$success]));
      poeticsoft_content_payment_stripe_webhook_events_session_success($sessionid);
    }

    if (isset($_GET[$cancel])) {

      $sessionid = sanitize_text_field(wp_unslash($_GET[$cancel]));
      poeticsoft_content_payment_stripe_webhook_events_session_cancel($sessionid);
    }
  }
);
