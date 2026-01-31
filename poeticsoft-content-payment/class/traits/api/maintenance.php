<?php

trait PCP_API_Maintenance {
  
  public function register_pcp_api_maintenance() { 

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'maintenance/test',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_maintenance_test'],
            'permission_callback' => '__return_true'
          ]
        );

        register_rest_route(
          'poeticsoft/contentpayment',
          'maintenance/updatepayments',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_maintenance_updatepayments'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );   
  }
    
  public function api_maintenance_test( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {  

      // $data = $this->gclient_sheet_read();
      $data = $this->gclient_sheet_get_filedata();

      $res->set_data($data);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
    
  public function api_maintenance_updatepayments( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {  

      $result = $this->admin_payments_update_payments();

      $res->set_data($result);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
}