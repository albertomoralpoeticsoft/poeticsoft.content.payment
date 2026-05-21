<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

require_once dirname(__DIR__) . '/../class/Autoload.php';

global $post;

if (!$post) {
  return;
}

$mode = isset($attributes['mode']) ? $attributes['mode'] : 'compact'; // complete | compact
$contents = isset($attributes['contents']) ? $attributes['contents'] : 'all'; // all | allidentified | subscriptionsandfree
$sectionheadingtype = tag_escape(isset($attributes['sectionHeadingType']) ? $attributes['sectionHeadingType'] : 'h2');
$areaheadingtype = tag_escape(isset($attributes['areaHeadingType']) ? $attributes['areaHeadingType'] : 'h3');
$title = isset($attributes['title']) ? $attributes['title'] : '';

$childids = get_posts([
  'post_type' => 'page',
  'posts_per_page' => -1,
  'post_parent' => $post->ID,
  'fields' => 'ids'
]);

$titledom = '';
$childrendom = '';
$dom = '';

if(count($childids)) {

  $PCP = \Poeticsoft\Heart\Campus::instance(dirname(__DIR__) . '/plugin.php');
  $PCP->boot();

  switch($contents) {

    case 'all':

      // Return all ids

      break;

    case 'allidentified':

      if(!$PCP->validate_email()) { 

        $childids = [];
      }

      break;

    case 'subscriptionsandfree':

      $childids = array_values(
        array_filter(
          $childids,
          function($id) use ($PCP) {
            
            // $PCP->log('--------------------------------');
            // $PCP->log($id);
            // $PCP->log('canaccess');
            // $PCP->log($PCP->canaccess($id));
            // $PCP->log('canaccess_causechildaccesible');
            // $PCP->log($PCP->canaccess_causechildaccesible($id));

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
        esc_html($title) .
      '</' . $sectionheadingtype . '>';
    }

    $areapages = array_map(
      function($page) use ($mode, $areaheadingtype) {
        $permalink = get_permalink($page['ID']);
        if (!$permalink) {
          return '';
        }

        $pagedom = '<div class="Area">
        <' . $areaheadingtype . ' class="Title">
          <a href="' . esc_url($permalink) . '">' . 
            esc_html($page['title']) . 
          '</a>
        </' . $areaheadingtype . '>';
      
        if($mode == 'complete') {

          $thumb = isset($page['thumb']) ? $page['thumb'] : '';
          $thumbdom = $thumb ? '<img src="' . esc_url($thumb) . '" alt="' . esc_attr($page['title']) . '">' : '';

          $pagedom .= '<div class="Image">
            <a href="' . esc_url($permalink) . '">
              ' . $thumbdom . '
            </a>
          </div>
          <div class="Excerpt">' .
            esc_html($page['excerpt']) . 
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
      id="' . esc_attr(isset($attributes['blockId']) ? $attributes['blockId'] : '') . '" 
      class="wp-block-poeticsoft-containerchildren" 
    >' . 
      $childrendom .
    '</div>';
  } 
}

echo $dom;
