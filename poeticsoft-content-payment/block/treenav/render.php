<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined('ABSPATH') || exit;

require_once WP_PLUGIN_DIR . '/poeticsoft-content-payment/class/poeticsoft-content-payment.php';

(function(
  $attributes, 
  $content, 
  $block
) {

  $PCP = Poeticsoft_Content_Payment::get_instance();
  
  global $wpdb;
  global $post;

  $rootid = $attributes['treerootid'];
  $campusrootid = intval(get_option('pcp_settings_campus_root_post_id'));
  $pageslist = get_pages([  
    'sort_column' => 'menu_order',
    'sort_order'  => 'ASC',
    'post_status' => 'publish',
  ]);
  $validusermail = $PCP->validate_email();
  $usercontents = [];
  if($validusermail) {

    $tablename = $wpdb->prefix . 'payment_pays';
    $query = "
      SELECT post_id 
      FROM {$tablename}
      WHERE user_mail='{$validusermail}';
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
    $pageslist,
    &$buildPageTree
  ) {

    $list = [];
    foreach($pageslist as $page) {

      if($page->post_parent == $parent) {

        $incampus = $page->ID == $campusrootid 
                    ||
                    in_array($campusrootid, get_post_ancestors($page->ID));
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
          'incampus' => $incampus ? ' InCampus' : '',
          'isusercontents' => $isusercontents ? ' InUserContent' : '',
          'isfree' => ($incampus && $type == 'free') ? ' IsFree' : '',
          'title' => $page->post_title,
          'pages' => $buildPageTree($page->ID, $level)
        ];
      }
    }

    return $list;
  };

  $buildDomTree = function (
    $pages
  )
  use (
    &$buildDomTree
  ) {

    $dom = '';

    foreach($pages as $page) {

      $pagepath = get_page_uri($page['id']);
      $haschildren = count($page['pages']);

      $dom .= '<div 
        id="' . $page['id'] . '"   
        id="' . $page['id'] . '"
        class="Page' . 
          $page['isusercontents'] .
          ' Level_' . $page['level'] .
        '"
      >
        <div 
          class="Title' . 
            $page['current'] .
            $page['incampus'] .   
            $page['isfree'] . 
          '"
        >' .
          (
            $haschildren ? 
            '<div class="OpenClose"></div>'
            :
            '<div class="Indent"></div>'
          ) .
          '<a href="/' . $pagepath . '">' . 
            $page['title'] . 
          '</a>
        </div>
        <div class="Pages">' . 
          $buildDomTree($page['pages']) . 
        '</div>
      </div>';
    }

    return $dom;
  };

  $pagestree = $buildPageTree($rootid);
  $domtree = $buildDomTree($pagestree);

  echo  '<div 
    id="' . $attributes['blockId'] . '" 
    class="wp-block-poeticsoft-treenav" 
  >
    <div class="Nav">' .
      $domtree .
    '</div>
    <div class="Legend">
      <div class="Type InCampus">
        Campus
      </div>
      <div class="Type ShouldPay">
        De pago
      </div>
      <div class="Type Free">
        Libre
      </div>
      <div class="Type Paid">
        Pagado
      </div>
    </div>
  </div>';

})(
  $attributes, 
  $content, 
  $block
);