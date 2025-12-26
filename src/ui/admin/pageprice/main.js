import './main.scss'
import {
  editpageprice,
  normalpagesprices,
  nestedpagesprices
}from './js/pageprice'
import priceform from './js/priceform'

// Common
// wp-admin wp-core-ui no-js admin-bar post-type-page branch-6-9 version-6-9 admin-color-fresh locale-es-es svg wp-theme-poeticsoft-basic-theme no-customize-support
// Edit Page
// is-fullscreen-mode post-php block-editor-page wp-embed-responsive
// Pages list
// edit-php
// Nested pages
// toplevel_page_nestedpages

(function($) {

  const $body = $('body')
  let $pagesprices
  let formclass

  if($body.hasClass('block-editor-page')) {

    formclass = 'EditPage'
    $pagesprices = editpageprice($)
  }

  if($body.hasClass('toplevel_page_nestedpages')) {

    formclass = 'NestedPages'
    $pagesprices = nestedpagesprices($)
  }

  if($body.hasClass('edit-php')) {

    formclass = 'PagesList'
    $pagesprices = normalpagesprices($)
  }
  
  if(
    $pagesprices 
    &&
    $pagesprices.length
  ) {
    
    priceform($, $pagesprices, formclass)
  }

})(jQuery)

