<?php

trait PCP_API_Campus_Calendar {
  
  public function register_pcp_api_campus_calendar() { 

    add_action(
      'rest_api_init',
      function () {

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/calendar/events/get',
          [
            'methods'  => 'GET',
            'callback' => [$this, 'api_campus_calendar_events_get'],
            'permission_callback' => '__return_true'
          ]
        );

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/calendar/events/create',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_campus_calendar_events_add'],
            'permission_callback' => '__return_true'
          ]
        );        

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/calendar/events/update',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_campus_calendar_events_update'],
            'permission_callback' => '__return_true'
          ]
        );               

        register_rest_route(
          'poeticsoft/contentpayment',
          'campus/calendar/events/delete',
          [
            'methods'  => 'POST',
            'callback' => [$this, 'api_campus_calendar_events_delete'],
            'permission_callback' => '__return_true'
          ]
        );
      }
    );   
  }
    
  public function api_campus_calendar_events_get( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      global $wpdb;
      $tablename = $wpdb->prefix . 'campus_calendar';
      $events = $wpdb->get_results("SELECT * FROM $tablename", ARRAY_A);

      $res->set_data($events);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
    
  public function api_campus_calendar_events_add( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $event = $req->get_params();

      global $wpdb;
      $tablename = $wpdb->prefix . 'campus_calendar';
      $wpdb->insert($tablename, $event);

      $res->set_data([
        'id' => $wpdb->insert_id
      ]);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
    
  public function api_campus_calendar_events_update( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $event = $req->get_params();
      $id = (int) $event['id'];

      global $wpdb;
      $tablename = $wpdb->prefix . 'campus_calendar';
      $wpdb->update(
        $tablename,
        [
            'title' => sanitize_text_field($event['title']),
            'start' => sanitize_text_field($event['start']),
            'end'   => sanitize_text_field($event['end']),
            'allDay'=> (int) $event['allDay']
        ],
        [
          'id' => $id
        ]
      );

      $res->set_data($id);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
    
  public function api_campus_calendar_events_delete( WP_REST_Request $req ) {
        
    $res = new WP_REST_Response();

    try {     

      $event = $req->get_params();
      $id = (int) $event['id'];

      global $wpdb;
      $tablename = $wpdb->prefix . 'campus_calendar';
      $wpdb->delete($tablename, ['id' => $id]);

      $res->set_data($event);
    
    } catch (Exception $e) {
      
      $res->set_status($e->getCode());
      $res->set_data($e->getMessage());
    }

    return $res;
  }
}