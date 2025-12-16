<?php

/* Util check userid is logeduser */

function poeticsoft_content_payment_api_util_isloggeduser($userid) {
  
  $userloggedid = get_current_user_id();

  return $userloggedid == intval($userid);
}

function poeticsoft_content_payment_api_util_isadminuser() {
  
  return in_array('administrator',  wp_get_current_user()->roles);
}
    
require_once(dirname(__FILE__) . '/mail/main.php');
require_once(dirname(__FILE__) . '/price/main.php');
require_once(dirname(__FILE__) . '/identify/main.php');
require_once(dirname(__FILE__) . '/payment/main.php');

$allowedpublic = [
  '/wp-json/filebird/*'
];

$allowedlogedusers = [
  // '/wp-json/poeticsoft/contentpayment/price/getprice*'
];

add_filter( 
  'rest_authentication_errors', 
  function($result) use ($allowedpublic, $allowedlogedusers) { 

    if (!empty($result)) {
      
      return $result;
    } 

    $request_uri = $_SERVER['REQUEST_URI'] ?? '';

    foreach ($allowedpublic as $pattern) {

      $regex = '#^' . str_replace('\*', '.*', preg_quote($pattern, '#')) . '$#';
      if (preg_match($regex, $request_uri)) {

        return $result;

        break;
      }
    } 

    if (is_user_logged_in()) {

      foreach ($allowedlogedusers as $pattern) {

        $regex = '#^' . str_replace('\*', '.*', preg_quote($pattern, '#')) . '$#';
        if (preg_match($regex, $request_uri)) {

          return $result;

          break;
        }
      }

      if (poeticsoft_content_payment_api_util_isadminuser()) {

        return $result;
      }
    }

    return new WP_Error(

      'rest_cannot_access',
      __('REST API restricted access. Needs authentication.'),
      array( 'status' => 401 )
    );
  }
);
