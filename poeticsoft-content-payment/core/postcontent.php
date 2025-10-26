<?php

add_filter( 
  'render_block_core/post-content', 
  function($blockcontent, $block) {

    return $blockcontent;
  },
  10,
  2
);