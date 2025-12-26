import './main.scss'
import {
  nestedpagesprices,
  normalpagesprices
} from './js/utils-pagesprices'
import pagespriceform from './js/pagespriceform'

(function($) {

  let $pagesprices
  const $body = $('body')

  if($body.hasClass('toplevel_page_nestedpages')) {

    $pagesprices = nestedpagesprices($)
  }

  if(
    $body.hasClass('edit-php')
    &&
    $body.hasClass('post-type-page')
  ) {

    $pagesprices = normalpagesprices($)
  }

  if(
    $pagesprices 
    &&
    $pagesprices.length
  ) {
    
    pagespriceform($, $pagesprices)
  }

})(jQuery)

