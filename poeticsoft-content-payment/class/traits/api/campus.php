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

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/all-pages',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_campus_all_pages'],
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
    
  public function api_campus_all_pages( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $campusrootid = intval(get_option('pcp_settings_campus_root_post_id'));  
      if($campusrootid) {

        global $wpdb;
        
        $query = $wpdb->prepare("
          WITH RECURSIVE post_tree AS (
            SELECT ID, post_title, post_status, post_parent
            FROM {$wpdb->posts}
            WHERE ID = %d
            
            UNION ALL
            
            SELECT p.ID, p.post_title, p.post_status, p.post_parent
            FROM {$wpdb->posts} p
            INNER JOIN post_tree pt ON p.post_parent = pt.ID
          )
          SELECT ID, post_title, post_status, post_parent
          FROM post_tree
          WHERE post_status NOT IN ('inherit', 'trash')
        ", $campusrootid);

        $campuspages = array_map(
          function($post) {
            
            return $post;
          },
          $results = $wpdb->get_results($query)
        );

        $res->set_data($campuspages);

      } else {

        $res->set_data([]);
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