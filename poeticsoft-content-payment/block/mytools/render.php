<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

global $post;

if(!$post) {

  echo '';

} else {

  if(
    isset($_COOKIE['useremail'])
    &&
    isset($_COOKIE['codeconfirmed'])
    &&
    $_COOKIE['codeconfirmed'] == 'yes'
  ) {  

    $useremail = $_COOKIE['useremail'];
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
    // '<span class="PostID">' .
    //   $post->ID . 
    // '</span>' .
    '<span class="Identify">' . 
      $useremail . 
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