<?php

function poeticsoft_content_payment_price_updatedata( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();

  try { 
    
    $postid = $req->get_param('postid');
    $type = $req->get_param('type');
    $value = $req->get_param('value');

    if($type) {

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_type', 
        $type
      );
    }

    if(
      $value != null
      && 
      trim($value) != ''
    ) {

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_value', 
        $value
      );
    }  
    
    $values = [];
    
    $campusrootid = get_option('poeticsoft_content_payment_settings_campus_root_post_id');
    $campusvalue = poeticsoft_content_payment_prices_calculator(
      $campusrootid, 
      $values
    );
    $res->set_data([
      'campusrootid' => $campusrootid,
      'values' => $values,
      'campusvalue' => $campusvalue
    ]);
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

add_action(
  'rest_api_init',
  function () {

    register_rest_route(
      'poeticsoft/contentpayment',
      'price/updatedata',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_price_updatedata',
        'permission_callback' => '__return_true'
      ]
    );
  }
);