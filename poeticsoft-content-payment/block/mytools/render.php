<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

require_once WP_PLUGIN_DIR . '/poeticsoft-content-payment/class/poeticsoft-content-payment.php';

$PCP = Poeticsoft_Content_Payment::get_instance();

global $post;

if(!$post) {

  echo '';

} else {
  
  $validusermail = $PCP->validate_email();
  if($validusermail) {  

    $logouturl = get_permalink($post->ID);
    $logouturl = add_query_arg(
      [
        'action' => 'logout'
      ], 
      $logouturl
    );

    $element = '';
    switch($attributes['linkType']) {

      case 'button':

        $element = '<button class="
          wp-block-button__link 
          wp-element-button
        ">
          <a 
            href="' . $logouturl . '"
          >
            SALIR
          </a>
        </button>';

        break;

      case 'link':

        $element = '<a 
          href="' . $logouturl . '"
        >
          SALIR
        </a>';

        break;

      default:

        $element = '<a 
          href="' . $logouturl . '"
        >
          SALIR
        </a>';

        break;
    } 
    
    $identify = $attributes['idVisible'] ?
    '<span class="Identify">' . 
      $validusermail . 
    '</span>'
    :
    '';

    $link = '<span class="Logout">' .
      $element .
    '</span>';

    echo '<div 
      id="' . $attributes['blockId'] . '" 
      class="wp-block-poeticsoft-mytools" 
    >' . 
      $identify .
      $link .
    '</div>';

  } else {
    
    $element = '';
    switch($attributes['linkType']) {

      case 'button':

        $element = '<button class="
          wp-block-button__link 
          wp-element-button
        ">
          <a 
            href="#"
            class="Login"
          >
            ENTRAR
          </a>
        </button>';

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
      id="' . $attributes['blockId'] . '" 
      class="wp-block-poeticsoft-mytools" 
    >' .
      $element .
    '</div>';
  }
}