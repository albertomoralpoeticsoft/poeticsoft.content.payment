<?php

trait PCP_API_Pay {
  
  public function register_pcp_api_pay() {

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'pay/init',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_pay_init'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );
  }

  public function api_pay_init(WP_REST_Request $req) {
      
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
      $data['currency'] = get_option('pcp_settings_campus_payment_currency');  

      if($data['type'] == 'stripe') {
        
        $this->pay_stripe_session_create($data);
      }

      $this->pay_register($data);
      
      if(
        isset($data['payupdated'])
        ||
        isset($data['payinserted'])
      ) {
        
        $this->pay_notify($data);    
      } 

      $res->set_data($data);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
}