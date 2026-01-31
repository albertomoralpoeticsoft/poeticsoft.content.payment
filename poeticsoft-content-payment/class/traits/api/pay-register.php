<?php

trait PCP_API_Pay_Register {  
  
  public function pay_register(&$data) {

    global $wpdb;

    $email = $data['email'];
    $postid = $data['postid'];
    $stripesessionid = $data['stripesession'] ?
    $data['stripesession']['id']
    :
    null;

    $tablename = $wpdb->prefix . 'payment_pays';
    $data['payexists'] = $wpdb->get_results("
      SELECT * 
      FROM {$tablename}
      WHERE user_mail='{$email}'
      AND post_id={$postid};
    ");

    if(count($data['payexists'])) {

      $id = intval($data['payexists'][0]->id);
      $rowdata = [
        'price' => $data['price'],
        'currency' => $data['currency'],
        'type' => $data['type'],
        'mode' => 'payment',
        'stripe_session_id' => $stripesessionid,
        'stripe_session_result' => null,
        'confirm_pay_date' => null
      ];
      $rowformat = [
        '%f', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s', 
        '%s'
      ];
      $where = [
        'id' => $id
      ];
      $where_format = ['%d'];
      $data['payupdated'] = $wpdb->update(
        $tablename, 
        $rowdata, 
        $where, 
        $rowformat, 
        $where_format
      ); 

    } else {

      $rowdata = array(
        'user_mail' => sanitize_email($data['email']),
        'post_id' => intval($data['postid']),      
        'price' => $data['price'],
        'currency' => $data['currency'],
        'type' => $data['type'],
        'mode' => 'payment',
        'stripe_session_id' => $stripesessionid
      );
      $rowformat = array(
        '%s', 
        '%d', 
        '%f', 
        '%s', 
        '%s', 
        '%s', 
        '%s'
      );
      $data['payinserted'] = $wpdb->insert($tablename, $rowdata, $rowformat);
    }

    $data['wpdbperror'] = $wpdb->last_error;
  }
}