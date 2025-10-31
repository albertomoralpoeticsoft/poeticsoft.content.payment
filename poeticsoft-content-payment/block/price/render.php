<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

global $post;

if(!$post) {

  exit;
}

$postid = $post->ID;

$currency = get_option(
  'poeticsoft_content_payment_settings_campus_payment_currency', 
  '€'
);

$currencysymbol = [
  'eur' => '€',
  'usd' => '$'
];

$currencytext = $currencysymbol[$currency];

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

$text = '';

if(    
  $type
  &&
  trim($type) != ''
) {

  switch($type) {

    case 'free':

      $text .= '<span class="Statement">
        Este contenido es de libre acceso para suscriptores.
      </span>';

      break;

    case 'local':

      $text .= '<span class="Statement">
        Este contenido tienen un precio de:  
      </span> 
      <span class="Value">' . 
        $price . 
      '</span>
      <span class="Symbol">' . 
        $currencysymbol[$currency] . 
      '</span>';

      break;

    case 'sum':

      $text .= '<span class="Statement">
        Este bloque de contenidos tienen un precio de: 
      </span> 
      <span class="Value">' . 
        $price . 
      '</span>
      <span class="Symbol">' . 
        $currencysymbol[$currency] . 
      '</span>';

      break;
  }
}

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-price" 
>' .
  $text .
'</div>';