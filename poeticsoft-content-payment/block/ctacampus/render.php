<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

global $wpdb;

$table = $wpdb->prefix . 'payment_ctas';
$blockid = $attributes['blockId'];
$results = $wpdb->get_results(
  "SELECT * FROM $table WHERE block_id = '$blockid'"
);

$targetId = $attributes['targetId'];
$targetPost = get_post($targetId);
$url = get_permalink($targetId);
$ctaurl = $url . '?ctaid=' . $results[0]->id;

echo '<div 
  id="' . $blockid . '" 
  class="wp-block-poeticsoft-ctacampus" ' .
'>
  <div class="wp-block-button">
    <a 
      class="wp-block-button__link wp-element-button"
      href="' . $ctaurl . '"
    >' . 
      (
        $attributes['buttonText'] ?
        $attributes['buttonText']
        :
        $targetPost->post_title
      ) .
    '</a>
  </div>
</div>';