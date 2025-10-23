<?php

function poeticsoft_content_payment_price_savedata( WP_REST_Request $req ) {
      
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

    if($value) {

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_value', 
        ($value == 'null' ? '' : $value)
      );
    }    

    $res->set_data([
      'Suma_2' => rand(111,999),
      'Suma_48' => rand(111,999)
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
      'price/savedata',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_price_savedata',
        'permission_callback' => '__return_true'
      ]
    );
  }
);