<?php

/** -----------------------------------------------------------------------
 *  Price edit
 */

function poeticsoft_content_payment_form_editprice($postid) {  

  $ancestors = get_post_ancestors($postid);

  $currency = get_option(
    'poeticsoft_content_payment_settings_campus_payment_currency', 
    '€'
  );

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

  $index = 0;
  $indents = implode(
    '',
    array_map(
      function($i) use (&$index){

        $index += 1;

        return '<span class="Ancestor 
          Index_' . $index . '
          Ancestor_' . $i . '
        ">
        </span>';
      },
      $ancestors
    )
  );

  return '<div
    data-postid="' . $postid . '"
    class="poeticsoft_content_payment_assign_price_column"
  > 
    <div class="Column">
      <div class="Indents">' .
        $indents . 
      '</div>
      <div class="Price">
        <p class="Precio ' . $type . '">
          <span class="OpenClose"></span>
          <span class="Type Free">Libre</span>
          <span class="Type Sum">Suma</span>
          <span class="Type Local">Precio</span>
          <span class="Suma Suma_' . $postid . '"></span>
          <span class="Currency">' . $currency . '</span>
        </p>
      <div class="Selectors">
        <p class="Selector Free ' . ($type == 'free' ? 'Selected' : '') . '">
          <input 
            data-type="free"
            type="radio" 
            class="poeticsoft_content_payment_assign_price_type"
            name="poeticsoft_content_payment_assign_price_type_' . $postid . '" 
            value="free" ' .
            (
              (
                $type == 'free' 
                ||
                $type == ''
                ||
                $type == null
              ) ? 'checked' : ''
            ) .
          '/>
          <span class="Legend">
            Libre
          </span>
        </p>
        <p class="Selector Sum ' . ($type == 'sum' ? 'Selected' : '') . '">
          <input  
            data-type="sum"
            type="radio" 
            class="poeticsoft_content_payment_assign_price_type"
            name="poeticsoft_content_payment_assign_price_type_' . $postid . '" 
            value="sum" ' .
            ($type == 'sum' ? 'checked' : '') .
          '/>
          <span class="Legend">
            Suma
          </span>
        </p>
        <p class="Selector Local ' . ($type == 'local' ? 'Selected' : '') . '">
          <input   
            data-type="local"
            type="radio"  
            class="poeticsoft_content_payment_assign_price_type"
            name="poeticsoft_content_payment_assign_price_type_' . $postid . '" 
            value="local" ' .
            ($type == 'local' ? 'checked' : '') .
          '/>
          <input 
            type="number"  
            class="poeticsoft_content_payment_assign_price_value"
            name="poeticsoft_content_payment_assign_price_value_' . $postid . '" 
            value="' . $price . '" ' .
            ($type == 'local' ? '' : 'disabled') .
          '/>
          <span class="Currency">' . $currency . '</span>
        </p>
      </div>
    </div>
  </div>'; 
}

add_action(
  'add_meta_boxes', 
  function() {

    add_meta_box(
      'poeticsoft_content_payment_assign_price',
      'Precio',
      function ($post) {

        echo poeticsoft_content_payment_form_editprice($post->ID);
      },
      'page',
      'side',
      'default'
    );
  }
);

add_action(
  'wp_insert_post', 
  function($postid, $post, $update) {

    if ($update) return;

    if($post->post_type == 'page') { 

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_type', 
        'free'
      );
    }
  }, 
  10, 
  3
);

add_action(
  'save_post_page', 
  function($postid, $post, $update) {

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $postid)) return;

    if(isset($_POST['poeticsoft_content_payment_assign_price_type'])) {

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_type', 
        $_POST['poeticsoft_content_payment_assign_price_type']
      );
    }

    if(isset($_POST['poeticsoft_content_payment_assign_price_value'])) {

      update_post_meta(
        $postid, 
        'poeticsoft_content_payment_assign_price_value', 
        $_POST['poeticsoft_content_payment_assign_price_value']
      );
    }
  },
  10,
  3
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
    
      $campusrootid = intval(get_option('poeticsoft_content_payment_settings_campus_root_post_id')); 
      $ancestors = get_post_ancestors($postid);

      if(
        in_array(intval($campusrootid), $ancestors)
        ||
        $postid == $campusrootid
      ) {

        echo poeticsoft_content_payment_form_editprice($postid);
      }
    }
  }, 
  10, 
  2
); 