import './main.scss'
import {
  nestedpagesprices,
  normalpagesprices
} from './js/utils-pageprice'
import pageslist from './js/pageslist'

(function($) {

  let $pageprices
  const $body = $('body')

  if($body.hasClass('toplevel_page_nestedpages')) {

    $pageprices = nestedpagesprices($)
  }

  if(
    $body.hasClass('edit-php')
    &&
    $body.hasClass('post-type-page')
  ) {

    $pageprices = normalpagesprices($)
  }

  if(
    $pageprices 
    &&
    $pageprices.length
  ) {
    
    pageslist($, $pageprices)
  }

})(jQuery)

