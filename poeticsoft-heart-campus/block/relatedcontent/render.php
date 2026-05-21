<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

global $wpdb;
global $post;

if(!$post) {

  return;
}

$includesmode = isset($attributes['includesMode']) ? $attributes['includesMode'] : 'related'; // related | tags | relatedandtags
$mode = isset($attributes['mode']) ? $attributes['mode'] : 'compact'; // complete | compact
$tags = isset($attributes['tags']) ? $attributes['tags'] : '[]'; // array of tag ids
$sectionheadingtype = tag_escape(isset($attributes['sectionHeadingType']) ? $attributes['sectionHeadingType'] : 'h2');
$areaheadingtype = tag_escape(isset($attributes['areaHeadingType']) ? $attributes['areaHeadingType'] : 'h3');
$title = isset($attributes['title']) ? $attributes['title'] : '';
$visibility = isset($attributes['visibility']) ? $attributes['visibility'] : '';
$campusrootid = absint(get_option('pcp_settings_campus_root_post_id', 0)); 

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

  $tags = $tags ? $tags : [];

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
        esc_html($title) . 
      '</' . $sectionheadingtype . '>';
    }

    $areapages = array_map(
      function($page) use ($mode, $areaheadingtype) {
        $permalink = get_permalink($page->ID);
        if (!$permalink) {
          return '';
        }

        $pagedom = '<div class="Area">
        <' . $areaheadingtype . ' class="Title">
          <a href="' . esc_url($permalink) . '">' . 
            esc_html($page->post_title) . 
          '</a>
        </' . $areaheadingtype . '>';
      
        if($mode == 'complete') {

          $thumb = get_the_post_thumbnail_url($page->ID, 'full');
          $thumbdom = $thumb ? '<img src="' . esc_url($thumb) . '" alt="' . esc_attr($page->post_title) . '">' : '';

          $pagedom .= '<div class="Image">
            <a href="' . esc_url($permalink) . '">
              ' . $thumbdom . '
            </a>
          </div>
          <div class="Excerpt">' .
            esc_html($page->post_excerpt) . 
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
    id="' . esc_attr(isset($attributes['blockId']) ? $attributes['blockId'] : '') . '" 
    class="wp-block-poeticsoft-relatedcontent" 
  >' .
    $relateddom .
  '</div>';
}
