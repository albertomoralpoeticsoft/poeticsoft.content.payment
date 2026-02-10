<?php

trait PCP_Blocks {
  
  public function register_pcp_blocks() {

    $blockdir = self::$dir . 'block';
    $blocknames = array_diff(
      scandir($blockdir),
      ['..', '.']
    );
    
    add_filter(
      'block_categories_all', 
      function (
        $categories, 
        $post 
      ) {

        return array_merge(
          [
            [
              'slug'  => 'poeticsoft',
              'title' => __( 'Poeticsoft', 'poeticsoft' ),
              'icon'  => 'superhero'
            ],
          ],
          $categories      
        );
      }, 
      10, 
      2 
    );

    add_action( 
      'enqueue_block_assets', 
      function() {
        
        wp_enqueue_style('dashicons');
      }
    );    

    /* ------------------------------------------------------- */    
    /* Core configs */  

    $block_type = WP_Block_Type_Registry::get_instance()->get_registered('core/post-content');
    if($block_type) {
      
      $block_type->attributes['showpagecontent'] = [
        'type'    => 'string'
      ];
    }  

    add_filter(
      'enqueue_block_editor_assets',
      function() {      

        wp_enqueue_script(
          'pcp-coreblocks-configs',
          self::$url . 'ui/edit/coreconfigs/main.js',
          [
            'jquery'
          ],
          filemtime(self::$dir . 'ui/edit/coreconfigs/main.js'),
          true
        );
      }
    );

    /* ------------------------------------------------------- */

    foreach($blocknames as $key => $blockname) {

      if(!in_array($blockname, self::$availableblocks)) { continue; }
      
      $blockjsondir = $blockdir . '/' . $blockname;
      
      register_block_type($blockjsondir);
    }
  }
}