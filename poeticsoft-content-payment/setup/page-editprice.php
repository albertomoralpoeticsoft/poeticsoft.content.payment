<?php

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

  $discount = get_post_meta(
    $postid, 
    'poeticsoft_content_payment_assign_price_discount', 
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
          <span class="SumaDiscount">
            -
          </span>      
          <input 
            type="number"  
            class="poeticsoft_content_payment_assign_price_discount"
            min="0"
            name="poeticsoft_content_payment_assign_price_discount_' . $postid . '" 
            value="' . $discount . '" ' .
          '/>
          <span class="Currency">' . $currency . ' (Descuento)</span>
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