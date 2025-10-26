<?php

/**
 * Calcula recursivamente el valor de los posts a partir de un top parent
 * asigna valores por defecto (Free & 0€), corrige defectos
 * y genera una lista de los post ids con su tipo y valor para el front end
 */

function poeticsoft_content_payment_prices_update() { 
  
  $campusrootid = get_option('poeticsoft_content_payment_settings_campus_root_post_id');
  if(
    !$campusrootid
    ||
    trim($campusrootid) == ''
  ) {

    return [
      'posts' => [],
      'code' => 'error',
      'message' => 'Campus ID not found'
    ];
  } 
    
  $campusrootpost = get_post($campusrootid);
  if(!$campusrootpost) {    

    return [
      'posts' => [],
      'code' => 'error',
      'message' => 'Campus root post not found'
    ];
  }

  $pages = [];
  poeticsoft_content_payment_prices_resurseupdate($campusrootid, $pages);
  
  return [
    'posts' => $pages,
    'code' => 'ok'
  ];
}

function poeticsoft_content_payment_prices_resurseupdate(
  $postid, 
  &$pages = []
) {

  $type = get_post_meta(
    $postid, 
    'poeticsoft_content_payment_assign_price_type', 
    true
  );

  if(    
    !$type
    ||
    trim($type) == ''
  ) {

    $type = 'free';    

    update_post_meta(
      $postid, 
      'poeticsoft_content_payment_assign_price_type', 
      $type
    );
  }

  $value = floatval(
    get_post_meta(
      $postid, 
      'poeticsoft_content_payment_assign_price_value', 
      true
    )
  );

  if(    
    !$value
    ||
    trim($value) == ''
  ) {

    $value = 0;
  }

  $childids = get_posts(array(
    'post_type'      => 'page',
    'post_parent'    => $postid,
    'posts_per_page' => -1,
    'post_status'    => 'publish',
    'fields'         => 'ids'
  ));

  switch($type) {

    case 'free':    

      $postprice = 0;

      $pages[$postid] = [
        'type' => $type,
        'value' => $postprice,
        'childids' => $childids
      ];

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_value', 
        $postprice
      );      
      
      foreach($childids as $childid) {
      
        $postprice += poeticsoft_content_payment_prices_resurseupdate(
          $childid,
          $pages
        );
      }

      break;

    case 'local':

      $postprice = $value;

      $pages[$postid] = [
        'type' => $type,
        'value' => $postprice,
        'childids' => $childids
      ];
      
      foreach($childids as $childid) {
      
        $postprice += poeticsoft_content_payment_prices_resurseupdate(
          $childid,
          $pages
        );
      }

      break;

    case 'sum':

      $postprice = 0;      
      
      foreach($childids as $childid) {
      
        $postprice += poeticsoft_content_payment_prices_resurseupdate(
          $childid,
          $pages
        );
      }

      $pages[$postid] = [
        'type' => $type,
        'value' => $postprice,
        'childids' => $childids
      ];

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_value', 
        $postprice
      );

      break;

    default:    

      $postprice = 0;

      $pages[$postid] = [
        'type' => 'free',
        'value' => $postprice,
        'childids' => $childids
      ];

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_type', 
        'free'
      );

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_value', 
        0
      );   
      
      foreach($childids as $childid) {
      
        $postprice += poeticsoft_content_payment_prices_resurseupdate(
          $childid,
          $pages
        );
      }

      break;      
  }

  return $postprice;
}
