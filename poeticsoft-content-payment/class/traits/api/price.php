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

        register_rest_route(
          'poeticsoft/contentpayment',
          'state/updatefree',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_state_updatefree'],
            'permission_callback' => '__return_true'
          ]
        );

        register_rest_route(
          'poeticsoft/contentpayment',
          'state/getfree',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_state_getfree'],
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

  public function api_state_updatefree( WP_REST_Request $req ) {
        
    global $wpdb;

    $res = new WP_REST_Response();

    try { 
      
      $postid = $req->get_param('postid');
      $type = $req->get_param('isfree') ? 'free' : 'paid';
      
      if(!$postid) { 

        throw new Exception('Post id not provided', 404); 
      }
      
      $post = get_post($postid);
      if(!$post) { 

        throw new Exception('Post not found', 404); 
      }

      $update = update_post_meta(
        $postid,
        'poeticsoft_content_payment_assign_price_type',
        $type
      );

      $res->set_data([
        'postid' => $postid,
        'updated' => $update ? 'ok' : 'ko',
        'type' => $type
      ]);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }

  public function api_state_getfree( WP_REST_Request $req ) {
        
    global $wpdb;

    $res = new WP_REST_Response();

    try { 
      
      $campus_root_id = intval(get_option('pcp_settings_campus_root_post_id'));    
      
      if(!$campus_root_id) { 

        throw new Exception('Campus root id not provided', 404); 
      }
      
      $post = get_post($campus_root_id);
      if(!$post) { 

        throw new Exception('Campus root page not found', 404); 
      }
      
      $descendants = get_pages(array(
        'child_of'     => $campus_root_id,
        'post_type'    => get_post_type($campus_root_id),
        'post_status'  => [
          'publish',
          'pending', 
          'draft', 
          'private', 
          'future'          
        ],
      ));
      
      $ids = wp_list_pluck($descendants, 'ID');
      $ids[] = (int)$campus_root_id;
      $postsstatus = [];
      
      foreach($ids as $id) {
        
        $post_status = get_post_meta(
          $id,
          'poeticsoft_content_payment_assign_price_type',
          true
        );
        
        /*
        if($post_status != 'free') {
          
          update_post_meta(
            $id,
            'poeticsoft_content_payment_assign_price_type',
            'paid'
          );
          
          $post_status = 'paid';
        }
        */
        
        $postsstatus[$id] = $post_status;
      }

      $res->set_data($postsstatus);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
}