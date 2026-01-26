<?php

trait PCPT_Admin_PageInitdate {
  
  public function register_pcpt_admin_pageinitdate() { 
    
    add_action(
      'add_meta_boxes', 
      function($posttype, $post) {  
        
        if($posttype != 'page') {

          return;
        }
        
        $postid = $post->ID;
        $campusrootid = intval(get_option('pcpt_settings_campus_root_post_id'));  
        $descendants = get_pages([
          'child_of' => $campusrootid,
          'post_type' => 'page',
          'post_status' => 'publish'
        ]);
        $descendantids = wp_list_pluck($descendants, 'ID');
        $descendantids[] = $campusrootid;
        if(!in_array($postid, $descendantids)) {

          return;
        }

        $fecha = get_post_meta(
          $post->ID, 
          'pcpt_campus_page_initdate', 
          true
        );

        add_meta_box(
          'pcpt_campus_page_initdate_date',
          'Fecha inicio',
          function ($post) use ($fecha) { 

            echo '<div 
              class="pageinitdatewrapper" 
              data-id="post-' . $post->ID . '"
            >
              <div class="DatePicker"></div>
              <input
                type="hidden"
                id="pcpt_campus_page_initdate_date"
                name="pcpt_campus_page_initdate_date"
                value="' . $fecha . '"
                style="width:100%;"
              />
              <input
                type="hidden"
                id="pcpt_campus_page_initdate_date_nonce"
                name="pcpt_campus_page_initdate_date_nonce"
              />
            </div>'; 
          },
          'page',
          'side',
          'default'
        );
      },
      10,
      2
    ); 

    add_action(
      'save_post', 
      function ($post_id) {

        if (
          defined('DOING_AUTOSAVE') 
          && 
          DOING_AUTOSAVE
        ) {
          
          return;
        }      

        if (isset($_POST['pcpt_campus_page_initdate_date'])) {

          if (
            !isset($_POST['pcpt_campus_page_initdate_date_nonce']) 
            ||
            !wp_verify_nonce($_POST['pcpt_campus_page_initdate_date_nonce'], 'wp_rest')
          ) {

            return;
          }

          $this->log($_POST);

          update_post_meta(
            $post_id,
            'pcpt_campus_page_initdate',
            sanitize_text_field($_POST['pcpt_campus_page_initdate_date'])
          );
        }
      }
    );

    add_action( 
      'admin_enqueue_scripts', 
      function () {

        global $post;

        $screen = get_current_screen();

        if (
          $screen 
          && 
          ($screen->id === 'page')
        ) {     

          $campusrootid = intval(get_option('pcpt_settings_campus_root_post_id'));
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

          if(!in_array($post->ID, $descendantids)) {

            return;
          }

          wp_enqueue_script(
            'poeticsoft-content-payment-admin-pageinitdate', 
            self::$url . 'ui/admin/pageinitdate/main.js',
            [
              'jquery',
              'jquery-ui-datepicker'
            ], 
            filemtime(self::$dir . 'ui/admin/pageinitdate/main.js'),
            true
          );

          wp_enqueue_style(
            'jquery-ui-css',
            'https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css',
            [],
            '1.13.2'
          );

          wp_enqueue_style( 
            'poeticsoft-content-payment-admin-pageinitdate',
            self::$url . 'ui/admin/pageinitdate/main.css', 
            [              
              'jquery-ui-css'
            ], 
            filemtime(self::$dir . 'ui/admin/pageinitdate/main.css'),
            'all' 
          );  
        }
      } 
    );
  }
}