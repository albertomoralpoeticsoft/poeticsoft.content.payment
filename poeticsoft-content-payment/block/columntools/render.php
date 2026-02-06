<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

$defaultopen = $attributes['defaultOpen'];

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-columntools" 
>' . 
  (
    $defaultopen ? 
    '<span class="dashicons dashicons-arrow-left-alt2"></span>'
    :
    '<span class="dashicons dashicons-arrow-right-alt2"></span>'
   ) .
'</div>';