import './main.scss'
import {
  editpageprice,
  normalpagesprices,
  nestedpagesprices
}from './js/pageprice'
import priceform from './js/priceform'

(function($) {

  const $body = $('body')
  let $pagesprices
  let formclass

  const waitcampus = setInterval(() => {

    if(poeticsoft_content_payment_admin_campus_ids) {

      clearInterval(waitcampus)
      
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
    }

  }, 100)

})(jQuery)

