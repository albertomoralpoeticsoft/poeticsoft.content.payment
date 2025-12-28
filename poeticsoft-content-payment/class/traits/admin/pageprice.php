<?php

trait PCPT_Admin_Pageprice {
  
  public function register_pcpt_admin_pageprice() { 
    
    add_action(
      'add_meta_boxes', 
      function($posttype, $post) {    
        
        $postid = $post->ID;
        $campusrootid = intval(get_option('poeticsoft_content_payment_settings_campus_root_post_id')); 
        $ancestors = array_merge(
          [$campusrootid],
          get_post_ancestors($postid)
        );

        if(
          $posttype == 'page'
          &&
          in_array(intval($campusrootid), $ancestors)
        ) {

          add_meta_box(
            'poeticsoft_content_payment_page_assign_price',
            'Precio',
            function ($post) { 
              echo '<div class="pricewrapper" data-id="post-' . $post->ID . '"></div>'; 
            },
            'page',
            'side',
            'default'
          );
        }
      },
      10,
      2
    );    

    add_action(
      'wp_insert_post', 
      function($postid, $post, $update) {

        if ($update) return;

        if($post->post_type == 'page') { 

          update_post_meta(
            $postid, 
            'poeticsoft_content_payment_assign_price_type', 
            'free'
          );
        }
      }, 
      10, 
      3
    );

    add_action( 
      'admin_enqueue_scripts', 
      function () {

        $screen = get_current_screen();

        if (
          $screen 
          && 
          (
            $screen->id === 'page'
            ||
            $screen->id === 'edit-page'
            ||
            $screen->id === 'toplevel_page_nestedpages'
          )
        ) {     

          wp_enqueue_script(
            'poeticsoft-content-payment-admin-pageprice', 
            self::$url . 'ui/admin/pageprice/main.js',
            [
              'jquery'
            ], 
            filemtime(self::$dir . 'ui/admin/pageprice/main.js'),
            true
          );

          wp_enqueue_style( 
            'poeticsoft-content-payment-admin-pageprice',
            self::$url . 'ui/admin/pageprice/main.css', 
            [], 
            filemtime(self::$dir . 'ui/admin/pageprice/main.css'),
            'all' 
          );

          $campusrootid = intval(get_option('poeticsoft_content_payment_settings_campus_root_post_id'));
          if(
            !$campusrootid
            ||
            $campusrootid == ''
          ) {

            return;        
          }

          $descendants = get_pages([
            'child_of' => $campusrootid,
            'post_type' => 'page',
            'post_status' => 'publish'
          ]);
          $descendantids = wp_list_pluck($descendants, 'ID');
          $descendantids[] = $campusrootid;
          $campusids = array_map(
            function($id) {

              return 'post-' . $id;
            },
            $descendantids
          );

          wp_localize_script(
            'poeticsoft-content-payment-admin-pageprice', 
            'poeticsoft_content_payment_admin_campus_ids',
            $campusids
          );   
        }
      } 
    );
  }
}