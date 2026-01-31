<?php

trait PCP_API_Campus {
  
  public function register_pcp_api_campus() { 

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/pages',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_campus_pages'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );   
  }
    
  public function api_campus_pages( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $campusrootid = intval(get_option('pcp_settings_campus_root_post_id'));  
      if($campusrootid) {

        $rootpost = get_post($campusrootid);

        $campuspages = array_map(
          function($page) {
            
            return [
              'id' => $page->ID,
              'title' => $page->post_title,
              'parent' => $page->post_parent
            ];
          },
          array_merge(
            [ $rootpost ],
            get_pages([
              'child_of' => $campusrootid,
              'post_type' => 'page',
              'post_status' => 'publish',
              'sort_column' => 'menu_order'
            ])
          )
        );

        $res->set_data([
          'result' => 'ok',
          'data' => $campuspages
        ]);

      } else {

        $res->set_data([
          'result' => 'ok',
          'data' => []
        ]);
      }
    
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