<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

require_once WP_PLUGIN_DIR . '/poeticsoft-content-payment/class/poeticsoft-content-payment.php';

global $wpdb;
global $post;

$areas = '';
$results = [];
$mode = $attributes['mode']; // complete | compact
$contents = $attributes['contents']; // all | allidentified | subscriptionsandfree
$sectionheadingtype = $attributes['sectionHeadingType'];
$areaheadingtype = $attributes['areaHeadingType'];
$title = $attributes['title'];

$childids = get_posts([
  'post_type' => 'page',
  'posts_per_page' => -1,
  'post_parent' => $post->ID,
  'fields' => 'ids'
]);

$titledom = '';
$childrendom = '';
$dom;

if(count($childids)) {

  $PCP = Poeticsoft_Content_Payment::get_instance();

  switch($contents) {

    case 'all':

      // Return all ids

      break;

    case 'allidentified':

      if(!$PCP->canaccess_byemail()) { 

        $childids = [];
      }

      break;

    case 'subscriptionsandfree':

      $childids = array_values(
        array_filter(
          $childids,
          function($id) use ($PCP) {

            return $PCP->canaccess($id)
            ||
            $PCP->canaccess_causechildaccesible($id);
          }
        )
      );

      break;
  }

  if(count($childids)) {

    $children = array_map(
      function($post) use ($mode) {

        $child = [
          'ID' => $post->ID,
          'title'   => get_the_title($post->ID)
        ];

        if($mode == 'complete') {

          $child['excerpt'] = get_the_excerpt($post->ID);
          $child['thumb'] = get_the_post_thumbnail_url($post->ID, 'full');
        }

        return $child;
      },
      get_posts([
        'post__in' => $childids,
        'post_type' => 'page',
        'posts_per_page' => -1,
        'orderby' => 'menu_order', 
        'order' => 'ASC'
      ])
    );

    if($title) {

      $titledom .= '<' . $sectionheadingtype . ' class="Title">' . 
        $title .
      '</' . $sectionheadingtype . '>';
    }

    $areapages = array_map(
      function($page) use ($mode, $areaheadingtype) {

        $pagedom = '<div class="Area">
        <' . $areaheadingtype . ' class="Title">
          <a href="' . get_permalink($page['ID']) . '">' . 
            $page['title'] . 
          '</a>
        </' . $areaheadingtype . '>';
      
        if($mode == 'complete') {

          $pagedom .= '<div class="Image">
            <a href="' . get_permalink($page['ID']) . '">
              <img src="' . $page['thumb'] . '">
            </a>
          </div>
          <div class="Excerpt">' .
            $page['excerpt'] . 
          '</div>';
        }

        $pagedom .= '</div>';

        return $pagedom;

      },
      $children
    );

    $childrendom = $titledom . 
    '<div class="Areas">' . 
      implode(
        '',
        $areapages
      ) .  
    '</div>';

    $dom = '<div 
      id="' . $attributes['blockId'] . '" 
      class="wp-block-poeticsoft-campuscontainerchildren" 
    >' . 
      $childrendom .
    '</div>';
  } 
}

echo $dom;