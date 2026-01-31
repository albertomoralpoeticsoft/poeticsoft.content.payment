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

  $email = $_COOKIE['useremail'];

  $poststablename = $wpdb->prefix . 'posts';
  $paymentspaystablename = $wpdb->prefix . 'payment_pays';

  $sql = "
    SELECT posts.ID

    FROM {$paymentspaystablename} AS payments 
    INNER JOIN {$poststablename} AS posts
    ON payments.post_id = posts.ID 

    WHERE payments.user_mail = '{$email}'
    
    ORDER BY posts.post_title ASC;
  ";
  $result = $wpdb->get_col($sql);
  $mypostsids = implode(',', $result);

  $termstablename = $wpdb->prefix . 'terms';
  $termtaxonomytablename = $wpdb->prefix . 'term_taxonomy';
  $termrelationshipstablename = $wpdb->prefix . 'term_relationships';

  $sql = "
    SELECT DISTINCT t.term_id, t.name, t.slug
    FROM {$termstablename} t
    JOIN {$termtaxonomytablename} tt ON t.term_id = tt.term_id
    JOIN {$termrelationshipstablename} tr ON tt.term_taxonomy_id = tr.term_taxonomy_id

    WHERE tr.object_id IN ({$mypostsids})

    AND tt.taxonomy = 'post_tag';
  ";
  $myposttags = $wpdb->get_results($sql);
  $myposttagsids = implode(
    ',',
    array_map(
      function($tag) {

        return $tag->term_id;
      },
      $myposttags
    )
  );

  $sql = "
    SELECT DISTINCT p.ID, p.post_title
    FROM {$poststablename} AS p
    JOIN {$termrelationshipstablename} AS tr ON p.ID = tr.object_id
    JOIN {$termtaxonomytablename} AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id

    WHERE tt.term_id IN (7, 8)
      AND p.ID NOT IN (55, 58)
      AND p.post_type = 'page'
      AND p.post_status = 'publish'

    ORDER BY p.post_title ASC;
  ";  
  $mytagsotherposts = $wpdb->get_results($sql);

  $mytags = implode(
    '',
    array_map(
      function($tag) {

        return '<div class="Tag">' . $tag->name . '</div>';
      },
      $myposttags
    )
  );

  $otherposts = implode(
    '',
    array_map(
      function($post) {

        $thumburl = get_the_post_thumbnail_url($post->ID, 'full');        

        return '<div class="Post">
          <div class="Title">' . $post->post_title . '</div>
          <div class="Image">
            <img src="' . $thumburl . '" />
          </div>
        </div>';
      },
      $mytagsotherposts
    )
  );

}

echo '<div 
  id="' . $attributes['blockId'] . '" 
  class="wp-block-poeticsoft-relatedpages" 
>
  <div class="MyTags">
    <' . $attributes['headingType'] . ' class="Title">Mis tags</' . $attributes['headingType'] . '>
    <div class="List">' . $mytags . '</div>
  </div>
  <div class="RelatedPages">
    <' . $attributes['headingType'] . ' class="Title">Relacionados</' . $attributes['headingType'] . '>
    <div class="List">' . $otherposts . '</div>
  </div>
</div>';