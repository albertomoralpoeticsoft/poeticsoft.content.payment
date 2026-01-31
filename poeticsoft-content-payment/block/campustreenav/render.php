<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

// Kaldeera acoount
// https://gemini.google.com/app/2447b822bc21eb69

defined('ABSPATH') || exit;

(function(
  $attributes, 
  $content, 
  $block
) {
  
  global $wpdb;
  global $post;
  
  $campusrootid = intval(get_option('pcp_settings_campus_root_post_id'));
  $campuspages = get_pages([  
    'sort_column' => 'menu_order',
    'sort_order'  => 'ASC',
    'post_status' => 'publish',
    'child_of' => $campusrootid,
    'post_type' => 'page',
  ]);

  $useridentified = (
    isset($_COOKIE['useremail'])
    &&
    isset($_COOKIE['codeconfirmed'])
    &&
    $_COOKIE['codeconfirmed'] == 'yes'
  ) ?
  $_COOKIE['useremail']
  :
  false;

  $usercontents = [];
  
  if($useridentified) {

    $tablename = $wpdb->prefix . 'payment_pays';
    $query = "
      SELECT post_id 
      FROM {$tablename}
      WHERE user_mail='{$useridentified}';
    ";
    $usercontents = array_map(
      function($r) {
        
        return intval($r->post_id);
      },
      $wpdb->get_results($query)
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
      $isusercontents = in_array($campusrootid, $usercontents);
      $type = get_post_meta(
        $campusrootid, 
        'poeticsoft_content_payment_assign_price_type', 
        true
      );

      $level++;

      $list[] = [
        'id' => $campusrootid,
        'level' => $level,
        'type' => $type,
        'current' => ($campusrootid == $post->ID ? ' Current' : ''),
        'isusercontents' => $isusercontents ? ' InUserContent' : '',
        'isfree' => ($type == 'free') ? ' IsFree' : '',
        'title' => $page->post_title,
        'pages' => $buildPageTree($campusrootid, $level)
      ];

    } else {

      foreach($campuspages as $page) {

        if($page->post_parent == $parent) {

          $isusercontents = in_array($page->ID, $usercontents);
          $type = get_post_meta(
            $page->ID, 
            'poeticsoft_content_payment_assign_price_type', 
            true
          );

          $level++;

          $list[] = [
            'id' => $page->ID,
            'level' => $level,
            'type' => $type,
            'current' => ($page->ID == $post->ID ? ' Current' : ''),
            'isusercontents' => $isusercontents ? ' InUserContent' : '',
            'isfree' => ($type == 'free') ? ' IsFree' : '',
            'title' => $page->post_title,
            'pages' => $buildPageTree($page->ID, $level)
          ];
        }
      }
    }

    return $list;
  };

  $buildDomTree = function (
    $pages, 
    $parentIsUser = false, 
    $parentIsFree = false
  ) use (
    &$buildDomTree
  ) {
    
    $dom = '';
    $branchHasUserContent = false;
    $branchHasFree = false;

    foreach ($pages as $page) {

      // 1. Detectar si el nodo actual es User o Free
      $isThisNodeUser = !empty(trim($page['isusercontents']));
      $isThisNodeFree = !empty(trim($page['isfree'])) || $page['type'] === 'free';

      // 2. Determinar herencia (si mi padre lo era o yo lo soy, mis hijos lo serán)
      $inheritedUser = $parentIsUser || $isThisNodeUser;
      $inheritedFree = $parentIsFree || $isThisNodeFree;

      // 3. Llamada recursiva pasando la herencia hacia ABAJO
      $result = $buildDomTree($page['pages'], $inheritedUser, $inheritedFree);
      
      // 4. Determinar si hay algo especial hacia ARRIBA (descendientes)
      $hasWithinUser = $isThisNodeUser || $result['hasUserContent'];
      $hasWithinFree = $isThisNodeFree || $result['hasFree'];

      // 5. Informar a mi propio padre
      if ($hasWithinUser) $branchHasUserContent = true;
      if ($hasWithinFree) $branchHasFree = true;

      // 6. Construcción de clases dinámicas
      $extraClasses = '';
      if ($hasWithinUser) $extraClasses .= ' has-user-content-within';
      if ($hasWithinFree) $extraClasses .= ' has-free-within';
      if ($parentIsUser)  $extraClasses .= ' parent-is-user-content';
      if ($parentIsFree)  $extraClasses .= ' parent-is-free';

      $pagepath = get_page_uri($page['id']);
      $haschildren = count($page['pages']);

      $dom .= '<div 
          id="' . $page['id'] . '"
          class="Page' . $page['isusercontents'] . ' Level_' . $page['level'] . $extraClasses . '"
        >
          <div class="Title' . $page['current'] . $page['isfree'] . '">
            ' . ($haschildren ? '<div class="OpenClose"></div>' : '<div class="Indent"></div>') . '
            <a href="/' . $pagepath . '">' . $page['title'] . '</a>
          </div>
          <div class="Pages">' . $result['html'] . '</div>
        </div>';
    }

    return [
        'html' => $dom,
        'hasUserContent' => $branchHasUserContent,
        'hasFree' => $branchHasFree
    ];
  };

  // $enrichTree = function (
  //   $pages, 
  //   $parentIsUser = false, 
  //   $parentIsFree = false
  // ) use (
  //   &$enrichTree
  // ) {

  //   $enriched = [];
  //   $branchHasUser = false;
  //   $branchHasFree = false;

  //   foreach ($pages as $page) {
  //       // 1. Estados locales del nodo
  //       $isThisNodeUser = !empty(trim($page['isusercontents']));
  //       $isThisNodeFree = !empty(trim($page['isfree'])) || ($page['type'] === 'free');

  //       // 2. Herencia hacia abajo (descendencia)
  //       $inheritedUser = $parentIsUser || $isThisNodeUser;
  //       $inheritedFree = $parentIsFree || $isThisNodeFree;

  //       // 3. Procesar hijos (recursión)
  //       $childrenResult = $enrichTree($page['pages'], $inheritedUser, $inheritedFree);

  //       // 4. Estados hacia arriba (ascendencia)
  //       $hasWithinUser = $isThisNodeUser || $childrenResult['hasUserContent'];
  //       $hasWithinFree = $isThisNodeFree || $childrenResult['hasFree'];

  //       // 5. Actualizar los flags de esta rama para el nivel superior
  //       if ($hasWithinUser) $branchHasUser = true;
  //       if ($hasWithinFree) $branchHasFree = true;

  //       // 6. Construir el nuevo objeto enriquecido
  //       $enrichedNode = $page; // Copiamos datos originales
        
  //       // Añadimos los metadatos calculados
  //       $enrichedNode['meta'] = [
  //           'hasWithin' => [
  //               'userContent' => $hasWithinUser,
  //               'free' => $hasWithinFree
  //           ],
  //           'inherited' => [
  //               'isUserContent' => $parentIsUser,
  //               'isFree' => $parentIsFree
  //           ]
  //       ];
        
  //       // Reemplazamos las páginas por las ya procesadas
  //       $enrichedNode['pages'] = $childrenResult['nodes'];

  //       $enriched[] = $enrichedNode;
  //   }

  //   return [
  //       'nodes' => $enriched,
  //       'hasUserContent' => $branchHasUser,
  //       'hasFree' => $branchHasFree
  //   ];
  // };

  $pagestree = $buildPageTree();

  // $richtree = $enrichTree($pagestree);
  // $richtreenodes = $richtree['nodes'];

  $domtree = $buildDomTree($pagestree, false, false);
  $domtreehtml = $domtree['html'];
  $legend = $attributes['onlysubscriptions'] ?
  ''
  :
  '<div class="Legend">
    <div class="Type ShouldPay">
      Restringido
    </div>
    <div class="Type Free">
      Libre
    </div>
    <div class="Type Paid">
      Disponible
    </div>
  </div>';

  echo  '<div 
    id="' . $attributes['blockId'] . '" 
    class="wp-block-poeticsoft-campustreenav" 
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