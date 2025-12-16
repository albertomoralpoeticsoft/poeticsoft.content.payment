<?php

trait PCPT_Campus_Page { 
  
  public function register_pcpt_campus_page() {

    add_action(
      'init',
      function () {
        
        add_post_type_support( 'page', 'excerpt' );
      }
    );
  }
}
