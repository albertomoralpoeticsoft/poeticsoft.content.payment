<?php

trait PCP_API_Campus_Payments {
  
  public function register_pcp_api_campus_payments() { 

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/payments/get',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_campus_payments_get'],
            'permission_callback' => '__return_true'
          ]
        );

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/payments/create',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_campus_payments_add'],
            'permission_callback' => '__return_true'
          ]
        );        

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/payments/update',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_campus_payments_update'],
            'permission_callback' => '__return_true'
          ]
        );               

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/payments/delete',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_campus_payments_delete'],
            'permission_callback' => '__return_true'
          ]
        );               

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/payments/refresh',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_campus_payments_refresh'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );   
  }
    
  public function api_campus_payments_get( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      global $wpdb;
      $tablename = $wpdb->prefix . 'payment_pays';
      $pays = $wpdb->get_results("
        SELECT 
        id,
        user_mail,
        post_id
        FROM {$tablename}
      ", ARRAY_A);
      
      $res->set_data([
        'result' => 'ok',
        'data' => $pays
      ]);
    
    } catch (Exception $e) {

      $res->set_data([
        'result' => 'error',
        'code' => $e->getCode(),
        'reason' => $e->getMessage()
      ]);
    }

    return $res;
  }
    
  public function api_campus_payments_add( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $event = $req->get_params();

      global $wpdb;
      $tablename = $wpdb->prefix . 'payment_pays';
      $wpdb->insert($tablename, $event);

      if(isset($event['user_mail']) && isset($event['post_id'])) {

        $this->clear_access_cache($event['user_mail'], $event['post_id']);
      }

      $res->set_data([
        'result' => 'ok',
        'data' => $wpdb->insert_id
      ]);
    
    } catch (Exception $e) {

      $res->set_data([
        'result' => 'error',
        'code' => $e->getCode(),
        'reason' => $e->getMessage()
      ]);
    }

    return $res;
  }
    
  public function api_campus_payments_update( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $params = $req->get_params();
      
      $id = (int) $params['id'];
      unset($params['id']);

      global $wpdb;
      $tablename = $wpdb->prefix . 'payment_pays';

      $existing = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT user_mail, post_id FROM {$tablename} WHERE id = %d",
          $id
        )
      );

      $wpdb->update(
        $tablename,
        $params,
        [
          'id' => $id
        ]
      );

      if($existing) {

        $email = isset($params['user_mail']) ? $params['user_mail'] : $existing->user_mail;
        $postid = isset($params['post_id']) ? $params['post_id'] : $existing->post_id;
        $this->clear_access_cache($email, $postid);

        if(isset($params['user_mail']) && $params['user_mail'] != $existing->user_mail) {

          $this->clear_access_cache($existing->user_mail, $existing->post_id);
        }

        if(isset($params['post_id']) && $params['post_id'] != $existing->post_id) {

          $this->clear_access_cache($existing->user_mail, $existing->post_id);
        }
      }

      $res->set_data([
        'result' => 'ok',
        'data' => $id
      ]);
    
    } catch (Exception $e) {

      $res->set_data([
        'result' => 'error',
        'code' => $e->getCode(),
        'reason' => $e->getMessage()
      ]);
    }

    return $res;
  }
    
  public function api_campus_payments_delete( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $id = (int) $req->get_param('id');

      global $wpdb;
      $tablename = $wpdb->prefix . 'payment_pays';

      $existing = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT user_mail, post_id FROM {$tablename} WHERE id = %d",
          $id
        )
      );

      $wpdb->delete($tablename, ['id' => $id]);

      if($existing) {

        $this->clear_access_cache($existing->user_mail, $existing->post_id);
      }

      $res->set_data([
        'result' => 'ok',
        'data' => $id
      ]);
    
    } catch (Exception $e) {

      $res->set_data([
        'result' => 'error',
        'code' => $e->getCode(),
        'reason' => $e->getMessage()
      ]);
    }

    return $res;
  }
    
  public function api_campus_payments_refresh( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $update = $this->admin_payments_update_payments();

      $res->set_data([
        'result' => 'ok',
        'data' => $update
      ]);
    
    } catch (Exception $e) {

      $res->set_data([
        'result' => 'error',
        'code' => $e->getCode(),
        'reason' => $e->getMessage()
      ]);
    }

    return $res;
  }
}