<?php

function poeticsoft_content_payment_pay_init(WP_REST_Request $req) {
      
  $res = new WP_REST_Response();

  try { 

    $data = $req->get_params();
    $post = get_post($data['postid']);
    $data['price'] = floatval(
      get_post_meta(
        $data['postid'], 
        'poeticsoft_content_payment_assign_price_value', 
        true
      )
    );    
    $data['posttitle'] = $post->post_title;
    $data['postexcerpt'] = $post->post_excerpt;
    $data['postthumb'] = get_the_post_thumbnail_url($data['postid'], 'full');
    $data['currency'] = get_option('poeticsoft_content_payment_settings_campus_payment_currency');  

    if($data['type'] == 'stripe') {
      
      poeticsoft_content_payment_stripe_session_create($data);
    }

    poeticsoft_content_payment_pay_register($data);
    
    if(
      $data['payupdated']
      ||
      $data['payinserted']
    ) {
      
      poeticsoft_content_payment_pay_notify($data);    
    } 

    $res->set_data($data);
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}