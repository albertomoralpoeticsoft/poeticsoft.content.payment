<?php

trait PCP_API_Identify_GSheets {
  
  public function api_identify_gsheets($email) {         

    global $wpdb;
    $tablename = $wpdb->prefix . 'payment_pays';
    $pays = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT
         id,
         user_mail
         FROM {$tablename}
         WHERE user_mail = %s",
        $email
      )
    );

    if(count($pays)) {          

      $usercode = $this->api_identify_subscriber_registeroridentify($email);

      return [
        'result' => 'ok',
        'code' => $usercode,
        'data' => $pays[0]
      ];

    } else {

      return [
        'result' => 'error',
        'data' => 'notfound'
      ];
    }
  }
}