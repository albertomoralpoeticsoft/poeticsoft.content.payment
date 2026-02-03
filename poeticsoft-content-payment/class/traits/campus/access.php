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

          wp_safe_redirect(get_permalink($post->ID));
        }
      }
    );    
  }
  
  public function canaccess_causeisadmin() {  

    $current_user = wp_get_current_user();
    $allowadmin = get_option('pcp_settings_campus_roles_access', false);
    if (
      in_array(
        'administrator', 
        (array) $current_user->roles
      ) 
      &&
      $allowadmin
    ) {

      return true;
    }

    return false;
  }

  public function canaccess_byid($postid) {

    if($postid) {  
      
      $campusrootid = intval(get_option('pcp_settings_campus_root_post_id')); 
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

  function canaccess_bypostpaid($postid, $email) {

    global $wpdb;

    if($postid) {       

      $type = get_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_type', 
        true
      );

      if($type == 'free') {

        return true;
      }

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
      $monthsduration = intval(get_option('pcp_settings_campus_suscription_duration'));
      
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

            $paydate = new DateTime($paydate);
            $expirationdate = clone $paydate;
            $expirationdate->modify('+' . $monthsduration . ' months');
            $currenttime = new DateTime(current_time('mysql'));
            $canaccess = $currenttime >= $paydate
                        &&
                        $currenttime <= $expirationdate; 
          } else {

            $canaccess = true;
          }  
                      
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

  public function canaccess($post) {
    
    if($this->canaccess_causeisadmin()) {

      return true;
    }

    if($this->canaccess_byid($post)) {

      return true;
    }

    $useremail = $this->canaccess_byemail();

    if($useremail) {

      $postpaid = $this->canaccess_bypostpaid($post, $useremail);

      if($postpaid) {        
      
        return true;
      }
    }

    return false;
  }
}