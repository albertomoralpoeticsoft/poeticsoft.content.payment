<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined( 'ABSPATH' ) || exit;

$block_id = $attributes['blockId'];
$color = $attributes['color'];
$svgscript  = $attributes['svgscript'];
$width = $attributes['width'];
$minWidth = $attributes['minWidth'];
$maxWidth = $attributes['maxWidth'];
$classAlign = array_key_exists('align', $attributes) ? $attributes['align'] : '';

$wrapper_attributes = get_block_wrapper_attributes([
  'class' => $classAlign,
  'style' => '
    width: clamp('. $minWidth . 'px, '. $width . '%, '. $maxWidth . 'px); 
    padding: 0px 0px clamp('. $minWidth . 'px, '. $width . '%, '. $maxWidth . 'px);
    position: relative;
    overflow: hidden;
  '
]);

echo '<div 
  id="' . $block_id . '" ' .
  $wrapper_attributes .
'>
  <div class="SVG">
    <svg 
      id="svg_' . $block_id . '"
      width="100%" 
      height="100%" 
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <script 
        type="application/ecmascript"
        href="/wp-content/themes/poeticsoft-minimal-theme/svgscript/' . $svgscript . '/main.js"
        data-svgid=' . $block_id . '
        data-color=' . $color . '
      ></script>
    </svg>
  </div>
</div>
<script>

  document.addEventListener(
    "DOMContentLoaded", 
    () => {
      if(window.wp_block_poeticsoft_svganim) {

        window.wp_block_poeticsoft_svganim("' . $block_id . '") 
      }
    }
  ); 

</script>';