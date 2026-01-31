<?php

trait PCP_Blocks {
  
  public function register_pcp_blocks() {

    $blockdir = self::$dir . 'block';
    $blocknames = array_diff(
      scandir($blockdir),
      ['..', '.']
    );

    foreach($blocknames as $key => $blockname) {
      
      $blockjsondir = $blockdir . '/' . $blockname;
      
      $registered = register_block_type($blockjsondir);
    }
    
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
  }
}