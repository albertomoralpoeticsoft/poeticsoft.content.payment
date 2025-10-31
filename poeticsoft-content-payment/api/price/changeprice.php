<?php

function poeticsoft_content_payment_price_changeprice( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();

  try { 
    
    $postid = $req->get_param('postid');
    if($postid) {      

      $type = $req->get_param('type');
      if($type) {

        update_post_meta(
          $postid, 
          'poeticsoft_content_payment_assign_price_type', 
          $type
        );
      }

      $value = $req->get_param('value');
      if(
        $value
        &&
        $value != null
        && 
        trim($value) != ''
      ) {

        update_post_meta(
          $postid, 
          'poeticsoft_content_payment_assign_price_value', 
          floatval($value)
        );
      }
    }  
    
    $updated = poeticsoft_content_payment_tools_prices_update();

    $res->set_data($updated);
  
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
      'price/changeprice',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_price_changeprice',
        'permission_callback' => '__return_true'
      ]
    );
  }
);