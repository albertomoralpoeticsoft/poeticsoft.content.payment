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

if(isset($_COOKIE['useremail'])) { 

  $email = $_COOKIE['useremail'];
  $tablename = $wpdb->prefix . 'payment_pays';
  $query = "
    SELECT payments.id, 
           payments.post_id, 
           posts.post_title, 
           posts.post_name 

    FROM poeticsoft_sandbox_payment_pays AS payments 
    INNER JOIN poeticsoft_sandbox_posts AS posts
    ON payments.post_id = posts.ID 

    WHERE payments.user_mail = '{$email}'
    
    ORDER BY posts.post_title ASC;
  ";
  $results = $wpdb->get_results($query);

  $areas = implode(
    '',
    array_map(
      function ($p) {

        $thumburl = get_the_post_thumbnail_url($p->post_id, 'full');

        return '<div class="Area">
          <div class="Image">
            <img src="' . $thumburl . '" />
          </div>
          <a href="/' . $p->post_name . '">' . 
            $p->post_title . 
          '</a>
        </div>';
      },
      $results
    )
  );
}

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-mycampus" 
>' .
  '<div class="Title">MY CAMPUS</div>
  <div class="Areas">' . 
    $areas .
  '</div>
</div>';