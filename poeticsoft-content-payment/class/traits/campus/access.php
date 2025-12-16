<?php

trait PCPT_Campus_Access { 
  
  public function register_pcpt_campus_access() {    

    add_action(
      'template_redirect',
      function() {

        global $post;

        if (
          $post
          &&
          isset($_GET['action'])
          &&
          $_GET['action'] == 'logout'
        ) {

          unset($_COOKIE['useremail']);
          unset($_COOKIE['codeconfirmed']);
          setcookie('useremail', '', time() - 3600, '/');
          setcookie('codeconfirmed', '', time() - 3600, '/');

          wp_safe_redirect(get_permalink($post->ID));
        }
      }
    );    
  }

  public function canaccess_byid() {

    global $post;

    if($post) {  
      
      $postid = $post->ID;
      $campusrootid = intval(get_option('poeticsoft_content_payment_settings_campus_root_post_id')); 
      $ancestors = get_post_ancestors($postid);

      if(
        !in_array(intval($campusrootid), $ancestors)
        &&
        $postid != $campusrootid
      ) {

        return true;

      } else {

        return false;
      }
      
    } else {

      return false;
    }
  } 

  public function canaccess_byemail() {

    if(
      isset($_COOKIE['useremail'])
      &&
      isset($_COOKIE['codeconfirmed'])
      &&
      $_COOKIE['codeconfirmed'] == 'yes'
    ) { 

      return $_COOKIE['useremail'];

    } else {

      return false;
    }
  }

  function canaccess_bypostpaid($email) {

    global $post;
    global $wpdb;

    if($post) {  
      
      $postid = $post->ID;

      $type = get_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_type', 
        true
      );

      if($type == 'free') {

        return true;
      }

      $monthsduration = intval(get_option('poeticsoft_content_payment_settings_campus_suscription_duration'));
      $ancestorids = get_post_ancestors($postid);
      array_unshift($ancestorids, $postid);
      $tablename = $wpdb->prefix . 'payment_pays';
      $query = "
        SELECT * 
        FROM {$tablename}
        WHERE user_mail='{$email}';
      ";
      $results = $wpdb->get_results($query);
      $resultbypostids = [];

      foreach($results as $r) {

        $resultbypostids[$r->post_id] = $r;
      }

      $canaccess = false;

      foreach($ancestorids as $id) {

        if(isset($resultbypostids[$id])) {
          
          $paydate = $resultbypostids[$id]->confirm_pay_date;

          if(
            !$paydate
            ||
            $paydate == null
            ||
            $paydate == ''
          ) {

            continue;
          } 

          $paydate = new DateTime($paydate);
          $expirationdate = clone $paydate;
          $expirationdate->modify('+' . $monthsduration . ' months');
          $currenttime = new DateTime(current_time('mysql'));
          $canaccess = $currenttime >= $paydate
                      &&
                      $currenttime <= $expirationdate;        
                      
          if($canaccess) {      

            $resultid = $resultbypostids[$id]->id;
            $wpdb->update(
              $tablename,
              ['last_access_date' => current_time('mysql')],
              ['id' => $resultid],
              ['%s'],
              ['%d']
            );

            break;
          }
        }
      }

      return $canaccess;

    } else {

      return false;
    }
  }
}