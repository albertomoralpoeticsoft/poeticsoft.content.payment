<?php

trait PCPT_Admin_Pageslist {
  
  public function register_pcpt_admin_pageslist() { 

    add_action( 
      'admin_enqueue_scripts', 
      function () {

        $screen = get_current_screen();

        if (
          $screen 
          && 
          (
            $screen->id === 'edit-page'
            ||
            $screen->id === 'toplevel_page_nestedpages'
          ) 
        ) {  

          wp_enqueue_script(
            'poeticsoft-content-payment-admin', 
            self::$url . 'admin/pageslist/main.js',
            [
              'jquery'
            ], 
            filemtime(self::$dir . 'admin/pageslist/main.js'),
            true
          );

          wp_enqueue_style( 
            'poeticsoft-content-payment-admin',
            self::$url . 'admin/pageslist/main.css', 
            [
              'wp-block-library',
              'wp-block-library-theme'
            ], 
            filemtime(self::$dir . 'admin/pageslist/main.css'),
            'all' 
          );

          $pages = get_posts([
            'post_type'      => 'page',
            'post_status'    => 'any',
            'fields'         => 'ids',
            'posts_per_page' => -1,
          ]);

          $pageids = [];
          foreach ($pages as $pageid) {

            $pageids['post-' . $pageid] = array_map(
              function($child) {

                return 'post-' . $child;
              },
              get_children([
                'post_parent' => $pageid,
                'post_type'   => 'page',
                'fields'      => 'ids',
              ])
            );
          }

          wp_localize_script(
            'poeticsoft-content-payment-admin', 
            'poeticsoft_content_payment_admin_pageslist',
            $pageids
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
            'poeticsoft-content-payment-admin', 
            'poeticsoft_content_payment_admin_campus_ids',
            $campusids
          );          

          wp_localize_script(
            'poeticsoft-content-payment-admin', 
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