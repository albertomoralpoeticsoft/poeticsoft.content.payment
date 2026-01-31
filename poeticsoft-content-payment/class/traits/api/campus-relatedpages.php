<?php

trait PCP_API_Campus_RelatedPages {
  
  public function register_pcp_api_campus_relatedpages() { 

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/relatedpages/get',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_campus_relatedpages_get'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );   
  }
    
  public function api_campus_relatedpages_get( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $res->set_data([
        'result' => 'ok',
        'data' => []
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