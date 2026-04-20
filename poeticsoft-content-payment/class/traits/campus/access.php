<?php

trait PCP_Campus_Access { 
  
  public function register_pcp_campus_access() {   
    
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
          
          if($this->logged_user_mail()) {
            
            wp_logout();
          }
          
          wp_safe_redirect(get_permalink($post->ID));
          
          exit;
        }
      }
    );    
  }
  
  public function logged_user_mail() {   
    
    $user_id = get_current_user_id();
    
    if($user_id) {
      
      $user_info = get_userdata($user_id);
      if ($user_info) {
        
        $email = $user_info->user_email; 

        unset($_COOKIE['useremail']);
        unset($_COOKIE['codeconfirmed']);
        setcookie('useremail', '', time() - 3600, '/');
        setcookie('codeconfirmed', '', time() - 3600, '/');
        
        setcookie(
          'useremail',
          $email, 
          0,
          '/',
          COOKIE_DOMAIN,
          is_ssl(),
          true
        );

        setcookie(
          'codeconfirmed',
          'no',
          0,
          '/',
          COOKIE_DOMAIN,
          is_ssl(),
          true
        );    
        
        return $email;
          
      } else {
        
        return false;
      }
    } 
  }
  
  public function validate_email() {
    
    $logged_user_email = $this->logged_user_mail();
    
    if($logged_user_email) {
      
      return $logged_user_email;
      
    } else {
      
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
  } 

  public function canaccess_causenotincampus($postid) {  

    // $cache_key = "pcp_canaccess_causenotincampus_{$postid}";
    // $cached = get_transient($cache_key);
    // if($cached) {

    //   return $cached === 'true';
    // }   
     
    $canaccess = 'false';

    if($postid) {

      $campusrootid = $this->get_campus_root_id();
      $ancestors = get_post_ancestors($postid);

      if(
        !in_array(intval($campusrootid), $ancestors)
        &&
        $postid != $campusrootid
      ) {

        $canaccess = 'true';

      }      
    }
    
    // set_transient($cache_key, $canaccess, 600);

    return $canaccess === 'true';
  } 
  
  public function canaccess_causeisadmin() {  

    // $cache_key = "pcp_canaccess_causeisadmin";
    // $cached = get_transient($cache_key);
    // if($cached) {

    //     return $cached === 'true';
    // }   

    $current_user = wp_get_current_user();
    $allowadmin = $this->get_allow_admin();
    $canaccess = 'false';

    if (
      in_array(
        'administrator',
        (array) $current_user->roles
      )
      &&
      $allowadmin
    ) {

      $canaccess = 'true';
    }    
    
    // set_transient($cache_key, $canaccess, 600);

    return $canaccess === 'true';
  }

  function canaccess_causeisfree(
    $postid
  ) {

    // $cache_key = "pcp_canaccess_causeisfree_{$postid}";
    // $cached = get_transient($cache_key);      
    // if($cached) {

    //   return $cached === 'true';
    // }    
      
    $canaccess = 'false';

    if($postid) {

      $type = get_post_meta(
        $postid,
        'poeticsoft_content_payment_assign_price_type',
        true
      );

      if($type == 'free') {

        $canaccess = 'true';
      }
    }
    
    // set_transient($cache_key, $canaccess, 600);

    return $canaccess == 'true';
  }

  function canaccess_bypostpaid($postid) {
      
    $validusermail = $this->validate_email();
    if(!$validusermail) {
      
      return false;
    }

    // $cache_key = "pcp_canaccess_bypostpaid_{$postid}_{$email}";
    // $cached = get_transient($cache_key);      
    // if($cached) {

    //   return $cached === 'true';
    // }   
      
    $canaccess = 'false';

    global $wpdb;

    if($postid) {
      $ancestorids = $ancestors ?? get_post_ancestors($postid);
      array_unshift($ancestorids, $postid);
      $tablename = $wpdb->prefix . 'payment_pays';
      $placeholders = implode(',', array_fill(0, count($ancestorids), '%d'));
      $query = $wpdb->prepare(
        "SELECT *
         FROM {$tablename}
         WHERE user_mail = %s
         AND post_id IN ({$placeholders})
         ORDER BY confirm_pay_date DESC",
        array_merge([$validusermail], $ancestorids)
      );
      $results = $wpdb->get_results($query);

      $resultbypostids = [];
      foreach($results as $r) {

        $resultbypostids[$r->post_id] = $r;
      }  

      $canaccess = 'false';
      
      $monthsduration = $this->get_subscription_duration();
      $currenttimestamp = strtotime(current_time('mysql'));

      foreach($ancestorids as $id) {

        if(isset($resultbypostids[$id])) {

          if($monthsduration) {

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

            $paytimestamp = strtotime($paydate);
            $expirationtimestamp = strtotime("+{$monthsduration} months", $paytimestamp);

            $canaccess = (
              $currenttimestamp >= $paytimestamp
              &&
              $currenttimestamp <= $expirationtimestamp
            ) ? 'true' : 'false';
            
          } else {

            $canaccess = 'true';
          }  
                      
          if($canaccess == 'true') {

            $resultid = $resultbypostids[$id]->id;
            $last_access = $resultbypostids[$id]->last_access_date;
            $should_update = false;

            if(!$last_access) {

              $should_update = true;

            } else {

              $last_time = strtotime($last_access);
              $should_update = ($currenttimestamp - $last_time) > 3600;
            }

            if($should_update) {

              $wpdb->update(
                $tablename,
                ['last_access_date' => current_time('mysql')],
                ['id' => $resultid],
                ['%s'],
                ['%d']
              );
            }

            break;
          }
        }
      }

      // set_transient($cache_key, $canaccess, 600);

      return $canaccess == 'true';

    } else {

      return false;
    }
  }

  public function canaccess_causechildaccesible($postid) {    

    // $cache_key = "pcp_canaccess_causechildaccesible_{$postid}";
    // $cached = get_transient($cache_key);      
    // if($cached) {

    //   return $cached === 'true';
    // }   
    
    $canaccess = 'false';

    global $wpdb;

    $descendants = get_pages(array(
      'child_of' => $postid,
      'post_type' => 'page'
    ));
    $descendantsids = wp_list_pluck($descendants, 'ID');

    if(!empty($descendantsids)) {  
      
      $validusermail = $this->validate_email();
      if (!$validusermail) { 
    
        // set_transient($cache_key, $canaccess, 600);

        return false;
      }
      
      $postmetatablename = $wpdb->prefix . 'postmeta';
      $paymenttablename = $wpdb->prefix . 'payment_pays';
      $descendantsids = implode(',', $descendantsids);
      $sql = "
        SELECT post_id AS id FROM {$postmetatablename}
        WHERE 
        meta_key = 'poeticsoft_content_payment_assign_price_type' 
        AND 
        meta_value = 'free'
        AND 
        post_id IN ($descendantsids)  

        UNION 

        SELECT post_id AS id FROM {$paymenttablename} 
        WHERE 
        user_mail = '$validusermail' 
        AND 
        post_id IN ($descendantsids)
      ";
      $descendantsvisibles = $wpdb->get_results($sql);
      
      if (count($descendantsvisibles)) {
          
        $canaccess = 'true';
      }
    }
        
    // set_transient($cache_key, $canaccess, 600);

    return $canaccess == 'true'; 
  }
  
  public function canaccess($postid) {  

    // $cache_key = "pcp_canaccess_{$postid}";
    // $cached = get_transient($cache_key);
    // if($cached) {

    //   return $cached === 'true';
    // } 
     
    $canaccess = 'false';
    
    if($this->canaccess_causenotincampus($postid)) {

      $canaccess = 'true';    
    }

    if($this->canaccess_causeisadmin()) { 
      
      $canaccess = 'true';     
    }

    if($this->canaccess_causeisfree($postid)) {
      
      $canaccess = 'true';     
    }

    if($this->canaccess_bypostpaid($postid)) { 
      
      $canaccess = 'true';     
    }
    
    // set_transient($cache_key, $canaccess, 600);

    return $canaccess === 'true';
  } 

  public function clear_access_cache($email, $postid = null) {

  //   global $wpdb;

  //   if($postid) {

  //     $cache_key = "pcp_access_{$postid}_{$email}";
  //     delete_transient($cache_key);

  //   } else {

  //     $tablename = $wpdb->prefix . 'payment_pays';
  //     $payments = $wpdb->get_results(
  //       $wpdb->prepare(
  //         "SELECT DISTINCT post_id FROM {$tablename} WHERE user_mail = %s",
  //         $email
  //       )
  //     );

  //     foreach($payments as $payment) {

  //       $cache_key = "pcp_access_{$payment->post_id}_{$email}";
  //       delete_transient($cache_key);
  //     }
  //   }
  }
}