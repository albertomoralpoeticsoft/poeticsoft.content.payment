<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

global $wpdb;
global $post;

$includesmode = $attributes['includesMode']; // related | tags | relatedandtags
$mode = $attributes['mode']; // complete | compact
$tags = $attributes['tags']; // array of tag ids
$sectionheadingtype = $attributes['sectionHeadingType'];
$areaheadingtype = $attributes['areaHeadingType'];
$title = $attributes['title'];
$visibility = $attributes['visibility'];
$campusrootid = intval(get_option('pcp_settings_campus_root_post_id')); 

$postchildids = get_posts([
  'post_type' => 'page',
  'posts_per_page' => -1,
  'post_parent' => $campusrootid,
  'fields' => 'ids'
]);   

if(
  !count($postchildids)
  &&
  $visibility == 'onlyincontainers'
) {

  echo '';

} else { 

  $tags = json_decode($tags);

  $tagids = [];

  if(
    $includesmode === 'related' 
    || 
    $includesmode === 'relatedandtags'
  ) {

    $posttags = wp_get_post_tags(
      $post->ID, 
      [
        'fields' => 'ids'
      ]
    );

    if (!is_wp_error($posttags)) {
      
      $tagids = array_merge($tagids, $posttags);
    }
  }   

  if (
    $includesmode === 'tags'
    || 
    $includesmode === 'relatedandtags'
  ) {
    
    $tagids = array_merge($tagids, $tags);
  }

  $tagids = array_unique($tagids);

  $areas = '';
  $results = [];

  if(!empty($tagids)) {

    $args = array(
      'post_type'      => 'page',
      'posts_per_page' => -1,
      'post__not_in'   => array($post->ID),
      'tag__in'        => $tagids,
      'orderby'        => 'date',
      'order'          => 'DESC'
    );

    $query = new WP_Query($args);

    $results = $query->posts;
  }

  $relateddom = '';
  $areas = '';
  $titledom = '';

  if(count($results)) {

    if($title) {

      $titledom .= '<' . $sectionheadingtype . ' class="Title">' . 
        $title . 
      '</' . $sectionheadingtype . '>';
    }

    $areapages = array_map(
      function($page) use ($mode, $areaheadingtype) {

        $pagedom = '<div class="Area">
        <' . $areaheadingtype . ' class="Title">
          <a href="' . get_permalink($page->ID) . '">' . 
            $page->post_title . 
          '</a>
        </' . $areaheadingtype . '>';
      
        if($mode == 'complete') {

          $thumb = get_the_post_thumbnail_url($page->ID, 'full');     

          $pagedom .= '<div class="Image">
            <a href="' . get_permalink($page->ID) . '">
              <img src="' . $thumb . '">
            </a>
          </div>
          <div class="Excerpt">' .
            $page->post_excerpt . 
          '</div>';
        }

        $pagedom .= '</div>';

        return $pagedom;

      },
      $results
    );

    $relateddom = $titledom . 
    '<div class="Areas">' . 
      implode(
        '',
        $areapages
      ) .  
    '</div>';
  }

  echo '<div 
    id="' . $attributes['blockId'] . '" 
    class="wp-block-poeticsoft-campusrelatedcontent" 
  >' .
    $relateddom .
  '</div>';
}