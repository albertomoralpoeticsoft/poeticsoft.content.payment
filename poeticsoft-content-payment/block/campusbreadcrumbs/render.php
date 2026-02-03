<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

$breadcrumbs = '';
$campusrootid = get_option('pcp_settings_campus_root_post_id');

if (is_single() || is_page()) {

  global $post;

  $separator = '<span class="Separator"> » </span>';

  $ancestors = get_post_ancestors($post);
  $ancestors = array_reverse($ancestors);
  error_log(json_encode($ancestors));
  $breadcrumbs = implode(
    $separator,
    array_map(
      function($id) use ($campusrootid) {

        return $id == $campusrootid ?
        
        '<a href="' . get_permalink($id) . '">' . 
          '📚' . 
        '</a>'
        :
        '<a href="' . get_permalink($id) . '">' . 
          get_the_title($id) . 
        '</a>';
      },
      $ancestors
    )
  );

  $breadcrumbs .= count($ancestors) ?
  $separator . '<span class="Actual">' . get_the_title() . '</span>'
  :
  '📚';
  
}

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-campusbreadcrumbs" ' .
'>' .
  $breadcrumbs .
'</div>';