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

    foreach($blocknames as $key => $blockname) {

      if(!in_array($blockname, self::$availableblocks)) { continue; }
      
      $blockjsondir = $blockdir . '/' . $blockname;
      
      register_block_type($blockjsondir);
    }
  }
}