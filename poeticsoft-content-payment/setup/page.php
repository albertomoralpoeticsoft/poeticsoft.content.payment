<?php
/** -----------------------------------------------------------------------
 *  ACCESS MANAGEMENT
 */

function poeticsoft_content_payment_get_contentpayments($postid) {

  $postid = intval($postid);

  if (!$postid) {
      
    return [];
  }

  $priced = [];
  $currentid = $postid;

  while ($currentid) {

    $price = get_post_meta(
      $currentid, 
      'poeticsoft_content_payment_assign_price_value', 
      true
    );

    if (
      $price !== '' 
      &&
      $price !== null
    ) {

      $priced[] = [
        'id'    => $currentid,
        'title' => get_the_title($currentid),
        'price' => $price,
      ];
    }

    $currentid = wp_get_post_parent_id($currentid);
  }

  return $priced;
}

add_action('add_meta_boxes', function() {

  add_meta_box(
    'poeticsoft_content_payment_assign_price',
    'Precio',
    function ($post) {

      $type = get_post_meta(
        $post->ID, 
        'poeticsoft_content_payment_assign_price_type', 
        true
      );

      $price = get_post_meta(
        $post->ID, 
        'poeticsoft_content_payment_assign_price_value', 
        true
      );

      wp_nonce_field(
        'poeticsoft_content_payment_assign_price', 
        'poeticsoft_content_payment_assign_price_nonce'
      );

      echo '<p>
        <input 
          type="radio" 
          name="poeticsoft_content_payment_assign_price_type" 
          value="sum" ' .
          (
            (
              $type == 'sum' 
              ||
              $type == ''
              ||
              $type == null
            ) ? 'checked' : ''
          ) .
        '/>
        <span class="Legend">
          Suma
        </span>        
        <span class="Legend">
          (' . 100 . ')
        </span>
      </p>
      <p>
        <input 
          type="radio" 
          name="poeticsoft_content_payment_assign_price_type" 
          value="local"' .
          ($type == 'local' ? 'checked' : '') .
        '/>
        <input 
          type="number" 
          name="poeticsoft_content_payment_assign_price_value" 
          value="' . $price . '"
          style="width: 100px"
        />
        <span class="Currency">€</span>
      </p>';
    },
    'page',
    'side',
    'default'
  );
});

add_action(
  'save_post_page', 
  function($post_id, $post, $update) {
    
    if ( 
      !wp_verify_nonce(
        $_POST['poeticsoft_content_payment_assign_price_nonce'], 
        'poeticsoft_content_payment_assign_price'
      )
    ) {
        
      return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post->ID)) return;

    update_post_meta(
      $post->ID, 
      'poeticsoft_content_payment_assign_price_type', 
      $_POST['poeticsoft_content_payment_assign_price_type']
    );

    update_post_meta(
      $post->ID, 
      'poeticsoft_content_payment_assign_price_value', 
      $_POST['poeticsoft_content_payment_assign_price_value']
    );
  },
  10,
  3
);

add_action(
  'template_redirect', 
  function() {

    if (is_singular('page')) {

      global $post;

      
    }
  }
);

// Page list

add_filter(
  'manage_page_posts_columns',
  function ($columns) {  

    $columns['price'] = 'Precio';

    return $columns;
  }
);

add_action(
  'manage_page_posts_custom_column', 
  function(
    $column_name, 
    $postid
  ) {

    if ($column_name == 'price') {      

      $type = get_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_type', 
        true
      );

      $price = get_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_value', 
        true
      );

      echo '<div
        data-postid="' . $postid . '"
        class="poeticsoft_content_payment_assign_price_column"
      >
        <p>
          <input 
            type="radio" 
            class="poeticsoft_content_payment_assign_price_type"
            name="poeticsoft_content_payment_assign_price_type_' . $postid . '" 
            value="sum" ' .
            (
              (
                $type == 'sum' 
                ||
                $type == ''
                ||
                $type == null
              ) ? 'checked' : ''
            ) .
          '/>
          <span class="Legend">
            Suma
          </span>
          <span class="Suma Suma_' . $postid . '">
          </span>
        </p>
        <p>
          <input 
            type="radio"  
            class="poeticsoft_content_payment_assign_price_type"
            name="poeticsoft_content_payment_assign_price_type_' . $postid . '" 
            value="local"' .
            ($type == 'local' ? 'checked' : '') .
          '/>
          <input 
            type="number"  
            class="poeticsoft_content_payment_assign_price_value"
            name="poeticsoft_content_payment_assign_price_value_' . $postid . '" 
            value="' . $price . '"
            style="width: 100px"
          />
          <span class="Currency">€</span>
        </p>
      </div>';
    }
  }, 
  10, 
  2
); 