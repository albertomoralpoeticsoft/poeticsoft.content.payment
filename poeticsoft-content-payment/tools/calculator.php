<?php

/**
 * Calcula recursivamente el valor de las páginas a partir de un top parent
 * y genera una lista de páginas de tipo "suma" con su valor calculado.
 *
 * @param int   $pageid ID de la página top parent
 * @param array &$pages Array por referencia donde se almacenarán las páginas de tipo "suma"
 * @return float Valor calculado de la página
 */

function poeticsoft_content_payment_prices_calculator(
  $pageid, 
  &$pages = []
) {

  $type = get_post_meta(
    $pageid, 
    'poeticsoft_content_payment_assign_price_type', 
    true
  );

  $price = floatval(
    get_post_meta(
      $pageid, 
      'poeticsoft_content_payment_assign_price_value', 
      true
    )
  );

  $children = get_posts(array(
    'post_type'      => 'page',
    'post_parent'    => $pageid,
    'posts_per_page' => -1,
    'post_status'    => 'publish',
    'fields'         => 'ids'
  ));

  if ($type === 'local') {

    $calculatedprice = $price !== '' ? floatval($price) : 0;
    $pages[$pageid] = $calculatedprice;

  } elseif ($type === 'free') {

    $calculatedprice = 0;
    $pages[$pageid] = $calculatedprice;

  } elseif ($type === 'sum') {

    $calculatedprice = 0;
    foreach ($children as $childid) {
      
      $calculatedprice += poeticsoft_content_payment_prices_calculator($childid, $pages);
    }
    $pages[$pageid] = $calculatedprice;
  }


  

  update_post_meta(
    $pageid, 
    'poeticsoft_content_payment_assign_price_suma', 
    $calculatedprice
  );

  return $calculatedprice;
}
