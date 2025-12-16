<?php

add_action( 
	'admin_enqueue_scripts', 
	function () {

    wp_enqueue_script(
      'poeticsoft-content-payment-admin', 
      WP_PLUGIN_URL . '/poeticsoft-content-payment/admin/main.js',
      [
        'jquery'
      ], 
      filemtime(WP_PLUGIN_DIR . '/poeticsoft-content-payment/admin/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-content-payment-admin',
      WP_PLUGIN_URL . '/poeticsoft-content-payment/admin/main.css', 
      [
        'wp-block-library',
        'wp-block-library-theme'
      ], 
      filemtime(WP_PLUGIN_DIR . '/poeticsoft-content-payment/admin/main.css'),
      'all' 
    );  

    wp_localize_script(
      'poeticsoft-content-payment-admin', 
      'poeticsoft_content_payment_admin', 
      [
        'nonce' => wp_create_nonce('wp_rest'),
      ]
    );

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
    }
	}, 
	15 
);