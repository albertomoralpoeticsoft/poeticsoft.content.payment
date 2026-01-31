<?php

trait PCP_API_Price {
  
  public function register_pcp_api_price() { 

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'price/changeprice',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_price_changeprice'],
            'permission_callback' => '__return_true'
          ]
        );

        register_rest_route(
          'poeticsoft/contentpayment',
          'price/getprice',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_price_getprice'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );   
  }
    
  public function api_price_changeprice( WP_REST_Request $req ) {
        
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

        $discount = $req->get_param('discount');
        if(
          $discount
          &&
          $discount != null
          && 
          trim($discount) != ''
        ) {

          update_post_meta(
            $postid, 
            'poeticsoft_content_payment_assign_price_discount', 
            floatval($discount)
          );
        }
      }  
      
      $updated = $this->api_price_update();

      $res->set_data($updated);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }

  public function api_price_getprice( WP_REST_Request $req ) {
        
    global $wpdb;

    $res = new WP_REST_Response();

    try { 
      
      $postid = $req->get_param('postid');
      if(!$postid) { 

        throw new Exception('Post id not provided', 404); 
      }
      
      $post = get_post($postid);
      if(!$post) { 

        throw new Exception('Post not found', 404); 
      }

      $results = $wpdb->get_results(
        $wpdb->prepare(
          "SELECT meta_key, meta_value 
          FROM $wpdb->postmeta 
          WHERE post_id = %d 
            AND meta_key LIKE %s",
          $postid,
          'poeticsoft_content_payment_assign_price%'
        )
      );

      $price = [];
      foreach($results as $result) {

        $price[str_replace('poeticsoft_content_payment_assign_price_', '', $result->meta_key)] = $result->meta_value;
      }

      $res->set_data($price);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
}