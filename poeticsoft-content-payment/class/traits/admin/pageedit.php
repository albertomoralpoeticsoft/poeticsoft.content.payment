<?php

trait PCPT_Admin_Pageedit {
  
  public function register_pcpt_admin_pageedit() { 
    
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

              echo '<div id="post-' . $post->ID . '" class="PCPPrice">    
                <div class="Precio">
                  <div class="Type Free">Libre</div>
                  <div class="Type Sum">Suma</div>
                  <div class="Type Local">Precio</div>
                  <div class="Value">
                    <div class="Suma">0</div>
                    <div class="Currency">eur</div>
                  </div>
                  <div class="PriceForm"></div>
                </div>
              </div>';
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
          $screen->id === 'page'
        ) {  

          wp_enqueue_script(
            'poeticsoft-content-payment-admin-pageedit', 
            self::$url . 'ui/admin/pageedit/main.js',
            [
              'jquery'
            ], 
            filemtime(self::$dir . 'ui/admin/pageedit/main.js'),
            true
          );

          wp_enqueue_style( 
            'poeticsoft-content-payment-admin-pageedit',
            self::$url . 'ui/admin/pageedit/main.css', 
            [
              'wp-block-library',
              'wp-block-library-theme'
            ], 
            filemtime(self::$dir . 'ui/admin/pageedit/main.css'),
            'all' 
          ); 

          wp_localize_script(
            'poeticsoft-content-payment-admin-pageedit', 
            'poeticsoft_content_payment_admin', 
            [
              'nonce' => wp_create_nonce('wp_rest'),
            ]
          );
        }
      } 
    );
  }
}