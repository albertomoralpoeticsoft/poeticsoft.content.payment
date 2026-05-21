<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

// Kaldeera acoount
// https://gemini.google.com/app/2447b822bc21eb69

defined('ABSPATH') || exit;

require_once dirname(__DIR__) . '/../class/Autoload.php';

(function(
  $attributes, 
  $content, 
  $block
) {
  
  $PCP = \Poeticsoft\Heart\Campus::instance(dirname(__DIR__) . '/plugin.php');
  $PCP->boot();
  
  global $wpdb;
  global $post;

  if (!$post) {
    return;
  }
  
  $onlySubscriptions = !empty($attributes['onlySubscriptions']);
  $campusrootid = absint(get_option('pcp_settings_campus_root_post_id', 0));

  if (!$campusrootid) {
    return;
  }

  $campuspages = get_pages([  
    'sort_column' => 'menu_order',
    'sort_order'  => 'ASC',
    'post_status' => 'publish',
    'child_of' => $campusrootid,
    'post_type' => 'page',
  ]);
  
  $validuseremail = $PCP->validate_email();
  
  $isadminandcanviewall = current_user_can('manage_options')
  &&
  (bool) get_option('pcp_settings_campus_roles_access', false);

  $usercontents = [];
  
  if($validuseremail) {

    $tablename = $wpdb->prefix . 'payment_pays';
    $query = "
      SELECT post_id 
      FROM {$tablename}
      WHERE user_mail = %s
    ";
    $usercontents = array_map(
      'intval',
      $wpdb->get_col(
        $wpdb->prepare($query, $validuseremail)
      )
    );
  }

  $buildPageTree = function( 
    $parent=0,
    $level=-1
  )
  use(
    $campusrootid,
    $usercontents,
    $post, 
    $campuspages,
    &$buildPageTree
  ) {

    $list = [];

    if($parent == 0) {

      $page = get_page($campusrootid);
      if (!$page) {
        return $list;
      }

      $isUserContents = in_array($campusrootid, $usercontents);
      $type = get_post_meta(
        $campusrootid, 
        'poeticsoft_content_payment_assign_price_type', 
        true
      );
      $type = is_string($type) ? trim($type) : '';

      $level++;

      $list[] = [
        'id' => $campusrootid,
        'level' => $level,
        'type' => $type,
        'current' => $campusrootid == $post->ID,
        'isUserContents' => $isUserContents,
        'isFree' => $type == 'free',
        'title' => $page->post_title,
        'pages' => $buildPageTree($campusrootid, $level)
      ];

    } else {

      foreach($campuspages as $page) {

        if($page->post_parent == $parent) {

          $isUserContents = in_array($page->ID, $usercontents);
          $type = get_post_meta(
            $page->ID, 
            'poeticsoft_content_payment_assign_price_type', 
            true
          );
          $type = is_string($type) ? trim($type) : '';

          $level++;

          $list[] = [
            'id' => $page->ID,
            'type' => $type,
            'level' => $level,
            'title' => $page->post_title,
            'current' => $page->ID == $post->ID,
            'isUserContents' => $isUserContents,
            'isFree' => $type == 'free',
            'pages' => $buildPageTree($page->ID, $level)
          ];
        }
      }
    }

    return $list;
  };

  $buildObjectTree = function (
    $pages, 
    $parentIsUser = false, 
    $parentIsFree = false
  ) use (
    $isadminandcanviewall,
    &$buildObjectTree
  ) {
    
    $pagedata = [];
    $branchHasUserContent = false;
    $branchHasFree = false;

    foreach ($pages as $page) {

      // 1. Detectar si el nodo actual es User o Free
      $isThisNodeUser = $page['isUserContents'];
      $isThisNodeFree = $page['isFree'];

      // 2. Determinar herencia (si mi padre lo era o yo lo soy, mis hijos lo serán)
      $inheritedUser = $parentIsUser || $isThisNodeUser;
      $inheritedFree = $parentIsFree || $isThisNodeFree;

      // 3. Llamada recursiva pasando la herencia hacia ABAJO
      $childrenpages = $buildObjectTree($page['pages'], $inheritedUser, $inheritedFree);
      
      // 4. Determinar si hay algo especial hacia ARRIBA (descendientes)
      $hasWithinUser = $isThisNodeUser || $childrenpages['hasUserContent'];
      $hasWithinFree = $isThisNodeFree || $childrenpages['hasFree'];

      // 5. Informar a mi propio padre
      if ($hasWithinUser) $branchHasUserContent = true;
      if ($hasWithinFree) $branchHasFree = true;

      $pagePath = get_permalink($page['id']);
      if (!$pagePath) {
        continue;
      }

      $hasChildren = isset($page['pages']) && count($page['pages']) > 0;
      
      $visible = $isadminandcanviewall || $parentIsUser || $isThisNodeUser || $hasWithinUser || $hasWithinFree;
      
      $pagedata[] = [
        'pageId' => $page['id'],
        'level' => $page['level'],
        'title' => $page['title'],
        'pagePath' => $pagePath,
        'current' => $page['current'],
        'hasChildren' => $hasChildren,        
        'isFree' => $page['isFree'],
        'isUserContents' => $page['isUserContents'],
        'hasWithinUser' => $hasWithinUser,
        'hasWithinFree' => $hasWithinFree,
        'parentIsUser' => $parentIsUser,
        'parentIsFree' => $parentIsFree,
        'visible' => $visible,
        'pages' => $childrenpages['children']
      ];
    }

    return [
        'children' => $pagedata,
        'hasUserContent' => $branchHasUserContent,
        'hasFree' => $branchHasFree
    ];
  };

  $buildDomTree = function (
    $pages
  ) use (
    &$buildDomTree,
    $onlySubscriptions
  ) {
    
    $dom = '';

    foreach ($pages as $page) {
        
      if(
        $onlySubscriptions 
        &&
        !$page['visible']
      ) {
        
        continue;
      }
        
      $innerdom = '';
      if($page['hasChildren']) {
        $innerdom = $buildDomTree($page['pages']);
      }
      
      $pagePath = get_permalink($page['pageId']);
      if (!$pagePath) {
        continue;
      }

      $dom .= '<div 
        id="' . esc_attr($page['pageId']) . '"
        class="Page Level_' . $page['level'] . 
          ($page['isUserContents'] ? ' IsUserContents' : '') .
          ($page['hasChildren'] ? ' HasChildren' : '') .
          ($page['isFree'] ? ' IsFree' : '') .
        '"
      >
        <div class="Title' . 
          ($page['current'] ? ' Current' : '') .
        '">' . 
          (
            $page['hasChildren'] ? 
            '<div class="OpenClose"></div>' 
            : 
            '<div class="Indent"></div>'
          ) .
          '<a 
            class="TitleLink"
            href="' . esc_url($pagePath) . '"
          >
              <span class="Text">' .
                  esc_html($page['title']) . 
              '</span>
              <span class="Icon' .
                ($page['isUserContents'] ? ' Paid' : '') .
                ($page['isFree'] ? ' Free' : '') .
              '">
              </span>
          </a>
        </div>' . 
        (
          $page['hasChildren'] ? 
          '<div class="Pages">' . $innerdom . '</div>' 
          : 
          ''
        ) .
      '</div>';
    }

    return $dom;
  };

  $pagestree = $buildPageTree(); 
  $objecttree = $buildObjectTree($pagestree, false, false);  
  $domtreehtml = $buildDomTree($objecttree['children']);
  $legend = !empty($attributes['showLegend']) ?
  '<div class="Legend">
    <div class="Type ShouldPay">
      <span class="Icon ShouldPay"></span>
      <span class="Text">Privado</span>
    </div>
    <div class="Type Free">
      <span class="Icon Free"></span>
      <span class="Text">Abierto</span>
    </div>
    <div class="Type Paid">
      <span class="Icon Paid"></span>
      <span class="Text">Tu contenido</span>
    </div>
  </div>'
  :
  '';

  echo  '<div 
    id="' . esc_attr(isset($attributes['blockId']) ? $attributes['blockId'] : '') . '" 
    class="wp-block-poeticsoft-treenav" 
  >
    <div class="Nav">' .
      $domtreehtml .
    '</div>' . 
    $legend .    
  '</div>';

})(
  $attributes, 
  $content, 
  $block
);
