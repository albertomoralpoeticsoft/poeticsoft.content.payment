<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

global $wpdb;
global $post;

$areas = '';
$results = [];
$mode = $attributes['mode']; // complete | compact
$contents = $attributes['contents']; // array of tags & selector
$sectionheadingtype = $attributes['sectionHeadingType'];
$areaheadingtype = $attributes['areaHeadingType'];
$title = $attributes['title'];

$chidrendom = 'Campus related content';

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-campusrelatedcontents" 
>' . 
  $chidrendom .
'</div>';