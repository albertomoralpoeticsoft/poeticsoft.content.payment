<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

global $wpdb;
global $post;

$email = null;
$areas = '';

$results = [];

if(
  isset($_COOKIE['useremail'])
  &&
  isset($_COOKIE['codeconfirmed'])
  &&
  $_COOKIE['codeconfirmed'] == 'yes'
) { 

  $postid = $post->ID;

  $email = $_COOKIE['useremail'];
  $paymentstablename = $wpdb->prefix . 'payment_pays';
  $poststablename = $wpdb->prefix . 'posts';
  $query = "
    SELECT payments.post_id, 
           posts.post_title, 
           posts.post_excerpt, 
           posts.post_name 

    FROM {$paymentstablename} AS payments 
    INNER JOIN {$poststablename} AS posts
    ON payments.post_id = posts.ID 

    WHERE payments.user_mail = '{$email}'
          AND 
          posts.post_parent = $postid
    
    ORDER BY posts.post_title ASC;
  ";
  $results = $wpdb->get_results($query);

  $areas = '';
  
  switch($attributes['mode']) {
    
    case 'complete':

      $areas = implode(
        '',
        array_map(
          function ($p) {

            $thumburl = get_the_post_thumbnail_url($p->post_id, 'full');

            return '<div class="Area">
              <div class="Image">
                <img src="' . $thumburl . '" />
              </div>
              <h3 class="Title">
                <a href="/' . $p->post_name . '">' . 
                  $p->post_title . 
                '</a>
              </h3>
              <div class="Excerpt">' . 
                $p->post_excerpt . 
              '</div>
            </div>';
          },
          $results
        )
      );

      break;

    case 'compact':

      $areas = implode(
        '',
        array_map(
          function ($p) {

            $thumburl = get_the_post_thumbnail_url($p->post_id, 'full');

            return '<div class="Area">
              <h3 class="Title">
                <a href="/' . $p->post_name . '">' . 
                  $p->post_title . 
                '</a>
              </h3>
            </div>';
          },
          $results
        )
      );

      break;

    default:

      break;
  }
  
  implode(
    '',
    array_map(
      function ($p) use ($results){

        $thumburl = get_the_post_thumbnail_url($p->post_id, 'full');

        return '<div class="Area">
          <div class="Image">
            <img src="' . $thumburl . '" />
          </div>
          <h3 class="Title">
            <a href="/' . $p->post_name . '">' . 
              $p->post_title . 
            '</a>
          </h3>
          <div class="Excerpt">' . 
            $p->post_excerpt . 
          '</div>
        </div>';
      },
      $results
    )
  );
}

$mycampus = (
  !count($results)
  &&
  $attributes['mode'] == 'complete'
 ) ?
'<div class="Areas ' . $attributes['mode'] . '">
  No hay contenido en tu campus
</div>'
:
'<div class="Areas ' . $attributes['mode'] . '">' . 
  $areas .
'</div>';

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-campuscontainerchildren" 
>' .
  $mycampus .
'</div>';