import './main.scss'
import {
  pageinitdate
}from './js/pageinitdate'

(function($) {

  const waitnonce = setInterval(() => {

    if(poeticsoft_content_payment_api) {

      clearInterval(waitnonce)

      const $body = $('body')

      if($body.hasClass('block-editor-page')) {

        pageinitdate($)
      }
    }
  }, 100)

})(jQuery)

