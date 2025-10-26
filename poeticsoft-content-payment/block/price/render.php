<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

global $post;
$postid = $post->ID;

$currency = get_option(
  'poeticsoft_content_payment_settings_campus_payment_currency', 
  '€'
);

$text = '';

$type = get_post_meta(
  $postid, 
  'poeticsoft_content_payment_assign_price_type', 
  true
);

$price = get_post_meta(
  $postid, 
  'poeticsoft_content_payment_assign_price_value', 
  true
);

if(    
  $type
  &&
  trim($type) != ''
) {

  switch($type) {

    case 'free':

      $text .= 'Este contenido es de libre acceso.';

      break;

    case 'local':

      $text .= 'Este contenido tienen un precio de: ' . $price . $currency;

      break;

    case 'sum':

      $text .= 'Este bloque de contenidos tienen un precio de: ' . $price . $currency;

      break;
  }
}

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-price" 
>' .
  $text .
'</div>';