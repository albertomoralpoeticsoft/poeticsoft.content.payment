<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

$breadcrumbs = '';

if (is_single() || is_page()) {

  $frontpage_id = get_option('page_on_front');
  $frontpage_title = get_the_title($frontpage_id);

  $separator = ' » ';

  global $post;

  $ancestors = get_post_ancestors($post);
  $ancestors = array_reverse($ancestors);
  $root = true;

  foreach ($ancestors as $ancestor_id) {
      
    $breadcrumbs .= (!$root ? $separator : '') . 
    '<a href="' . get_permalink($ancestor_id) . '">' . 
      get_the_title($ancestor_id) . 
    '</a>';
    $root = false;
  }

  $breadcrumbs .= $separator . '<span class="Actual">' . get_the_title() . '</span>';
  
}

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-breadcrumbs" ' .
'>' .
  $breadcrumbs .
'</div>';