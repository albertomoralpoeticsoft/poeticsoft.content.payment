<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

(function(
  $attributes, 
  $content, 
  $block
) {
  
  global $wpdb;
  global $post;

  $postid = $post->ID;
  $parentid = wp_get_post_parent_id($postid);
  $postparent = get_post($parentid);
  $args = array(
    'post_type' => 'page',
    'parent' => $parentid, 
    'sort_column' => 'menu_order',
    'exclude' => $parentid
  );
  $siblings = get_pages($args);
  $siblingslist = implode(
    '',
    array_map(
      function($sibling) {

        return '<li class="Sibling">
          <a 
            href="' . get_permalink($sibling->ID) . '"
          >' . 
            $sibling->post_title . 
          '</a>
        </li>';
      },
      $siblings
    )
  );

  echo  '<div 
    id="' . $attributes['blockId'] . '" 
    class="wp-block-poeticsoft-pagecontext" 
  >
    <' . $attributes['headingType'] . ' class="Parent">' .
      $postparent->post_title . 
    '</' . $attributes['headingType'] . '>
    <ul class="Context">' .
      $siblingslist .
    '</uj>
  </div>';

})(
  $attributes, 
  $content, 
  $block
);