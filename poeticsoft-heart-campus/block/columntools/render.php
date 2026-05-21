<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
$defaultOpen = !empty($attributes['defaultOpen']) ? '1' : '0';

echo '<div 
  id="' . $blockId . '" 
  class="wp-block-poeticsoft-columntools"
  data-defaultopen="' . $defaultOpen . '" 
>
  <span class="OpenClose"></span>
</div>';
