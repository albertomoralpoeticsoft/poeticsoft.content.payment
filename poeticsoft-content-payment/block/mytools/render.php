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

    echo '<div 
      id="' . $attributes['blockId'] . '" 
      class="wp-block-poeticsoft-mytools" 
    >
      <span class="Logout">
        <a href="' . $logouturl . '">
          Logout
        </a>
      </span>
    </div>';

  } else {

    echo '';
  }
}