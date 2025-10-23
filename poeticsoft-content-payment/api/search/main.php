<?php

function poeticsoft_content_payment_search_posts( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();

  try { 
    
    $term = sanitize_text_field($req->get_param('s'));

    if (empty($term)) {

      $res->set_data([]);

    } else {

      $args = [
        'post_type' => [
          'post', 
          'page'
        ],
        's' => $term,
        'posts_per_page' => 10,
      ];

      $query = new WP_Query($args);
      
      $results = array_map(
        function($post) {
          
          return [
            'id'    => $post->ID,
            'type'  => $post->post_type,
            'title' => $post->post_title,
            'content' => $post->post_content,
          ];        
        },
        $query->posts
      );

      $res->set_data($results);
    }
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

function poeticsoft_content_payment_get_post( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();

  try { 
    
    $postid = $req->get_param('postid');

    $post = get_post($postid);

    if (!$post) {

      $res->set_data([]);

    } else {

      $res->set_data([
        'id'    => $post->ID,
        'type'  => $post->post_type,
        'title' => $post->post_title,
        'content' => $post->post_content,
      ]);
    }
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

function poeticsoft_content_payment_get_children( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response();

  try { 
    
    $postid = $req->get_param('postid');

    $child_pages = get_pages([
      'parent'    => $postid,
      'sort_column' => 'menu_order',
      'sort_order'  => 'ASC'
    ]);

    $pages = implode(
      '',
      array_map(
        function($page) {
          
          $title = get_the_title( $page->ID );
          $excerpt = get_the_excerpt( $page->ID );

          if ( has_post_thumbnail( $page->ID ) ) {

            $thumbnail = get_the_post_thumbnail_url( $page->ID, 'medium' );

          } else {

            $thumbnail = '/wp-content/uploads/2025/10/anagrama-c.png';
          }

          return '<div class="Child">
            <div class="Image">
              <img src="' . $thumbnail . '" />
            </div>
            <h2 class="Title">' . 
                $title .
            '</h2>
            <p class="Excerpt">' . 
                $excerpt .
            '</p>
          </div>';
        },
        $child_pages
      )
    );  

    $result = $pages == '' ? 
    '<div class="NoContents">
      No hay contenidos
    </div>'
    :
    $pages;

    $res->set_data($result);
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

add_action(
  'rest_api_init',
  function () {

    register_rest_route(
      'poeticsoft/contentpayment',
      'searchposts',
      [
        'methods'  => 'GET',
        'callback' => 'poeticsoft_content_payment_search_posts',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'poeticsoft/contentpayment',
      'getpost',
      [
        'methods'  => 'GET',
        'callback' => 'poeticsoft_content_payment_get_post',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'poeticsoft/contentpayment',
      'getchildren',
      [
        'methods'  => 'GET',
        'callback' => 'poeticsoft_content_payment_get_children',
        'permission_callback' => '__return_true'
      ]
    );
  }
);