<?php

trait PCP_Admin_Pageslist {
  
  public function register_pcp_admin_pageslist() { 

    add_action( 
      'admin_enqueue_scripts', 
      function () {

        $pageutilsactive = get_option('pcp_settings_campus_page_utils');
        if(!$pageutilsactive) { return; }

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
            'poeticsoft-content-payment-admin-pageslist', 
            self::$url . 'ui/admin/pageslist/main.js',
            [
              'jquery'
            ], 
            filemtime(self::$dir . 'ui/admin/pageslist/main.js'),
            true
          );

          wp_enqueue_style( 
            'poeticsoft-content-payment-admin-pageslist',
            self::$url . 'ui/admin/pageslist/main.css', 
            [
              'wp-block-library',
              'wp-block-library-theme'
            ], 
            filemtime(self::$dir . 'ui/admin/pageslist/main.css'),
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

          $data_json = json_encode($pageids);
          $inline_js = "var poeticsoft_content_payment_admin_pageslist = {$data_json};";
          wp_add_inline_script(
            'poeticsoft-content-payment-admin-pageslist', 
            $inline_js, 
            'after'
          );
        }
      } 
    );
  }
}