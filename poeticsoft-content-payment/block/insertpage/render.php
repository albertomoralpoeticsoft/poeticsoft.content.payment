<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

global $post;

$pageid = $attributes['pageid'];
$page = get_post($pageid);
$showthumb = $attributes['showthumb'];
$showtitle = $attributes['showtitle'];
$showexcerpt = $attributes['showexcerpt'];
$showcontent = $attributes['showcontent'];

$pagethumb = $showthumb ? 
(
  has_post_thumbnail($pageid) ?
  '<div class="Image">
    <img src="' . 
      get_the_post_thumbnail_url($pageid, 'medium') . 
    '" />
  </div>'
  :
  ''
)
:
'';

$pagetitle = $showtitle ?
'<h2 class="Title">' . 
  $page->post_title . 
'</h2>'
:
'';

$pageexcerpt = $showexcerpt ?
'<div class="Excerpt">' . 
  $page->post_excerpt . 
'</div>'
:
'';

$pagecontent = $showcontent ?
'<div class="Content">' . 
  $page->post_content . 
'</div>'
:
'';

$text = json_encode($pageid);

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-insertpage" 
>' .
  $pagethumb .
  $pagetitle .
  $pageexcerpt .
  $pagecontent .
'</div>';