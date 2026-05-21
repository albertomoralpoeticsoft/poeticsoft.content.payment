<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

require_once dirname(__DIR__) . '/../class/Autoload.php';

$PCP = \Poeticsoft\Heart\Campus::instance(dirname(__DIR__) . '/plugin.php');
$PCP->boot();

global $post;

if(!$post) {

  return;

} else {
  
  $validusermail = $PCP->validate_email();
  if($validusermail) {  

    $logouturl = get_permalink($post->ID);
    if (!$logouturl) {
      $logouturl = home_url('/');
    }

    $logouturl = add_query_arg(
      [
        'action' => 'logout'
      ], 
      $logouturl
    );

    $element = '';
    $linkType = isset($attributes['linkType']) ? $attributes['linkType'] : 'link';
    switch($linkType) {

      case 'button':

        $element = '<a 
          class="
          wp-block-button__link 
          wp-element-button
          "
          href="' . esc_url($logouturl) . '"
        >
          SALIR
        </a>';

        break;

      case 'link':

        $element = '<a 
          href="' . esc_url($logouturl) . '"
        >
          SALIR
        </a>';

        break;

      default:

        $element = '<a 
          href="' . esc_url($logouturl) . '"
        >
          SALIR
        </a>';

        break;
    } 
    
    $identify = !empty($attributes['idVisible']) ?
    '<span class="Identify">' . 
      esc_html($validusermail) . 
    '</span>'
    :
    '';

    $link = '<span class="Logout">' .
      $element .
    '</span>';

    echo '<div 
      id="' . esc_attr(isset($attributes['blockId']) ? $attributes['blockId'] : '') . '" 
      class="wp-block-poeticsoft-mytools" 
    >' . 
      $identify .
      $link .
    '</div>';

  } else {
    
    $element = '';
    $linkType = isset($attributes['linkType']) ? $attributes['linkType'] : 'link';
    switch($linkType) {

      case 'button':

        $element = '<a 
          class="
          wp-block-button__link 
          wp-element-button
            Login
          "
          href="#"
        >
          ENTRAR
        </a>';

        break;

      case 'link':

        $element = '<a 
          href="#"
          class="Login"
        >
          ENTRAR
        </a>';

        break;

      default:

        $element = '<a 
          href="#"
          class="Login"
        >
          ENTRAR
        </a>';

        break;
    } 

    echo '<div 
      id="' . esc_attr(isset($attributes['blockId']) ? $attributes['blockId'] : '') . '" 
      class="wp-block-poeticsoft-mytools" 
    >' .
      $element .
    '</div>';
  }
}
