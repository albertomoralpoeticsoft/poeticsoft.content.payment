<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

$pages = '';

if (is_single() || is_page()) {

  global $post;

  $child_pages = get_pages([
    'parent'    => $post->ID,
    'sort_column' => 'menu_order',
    'sort_order'  => 'ASC'
  ]);

  $pages = implode(
    '',
    array_map(
      function($page) {
        
        $title = get_the_title( $page->ID );
        $permalink = get_permalink( $page->ID );
        $excerpt = get_the_excerpt( $page->ID );

        if ( has_post_thumbnail( $page->ID ) ) {

          $thumbnail = get_the_post_thumbnail_url( $page->ID, 'medium' );

        } else {

          $thumbnail = '/wp-content/uploads/2025/10/anagrama-c.png';
        }

        return '<div class="Child">
          <a class="Image">
            <img src="' . $thumbnail . '" />
          </a>
          <h2 class="Title">
            <a href="' . $permalink . '">' . 
              $title .
            '</a>
          </h2>
          <p class="Excerpt">' . 
              $excerpt .
          '</p>
        </div>';
      },
      $child_pages
    )
  );  
} 

echo $pages == '' ?
''
:
'<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-children" 
>' .
  $pages .
'</div>';