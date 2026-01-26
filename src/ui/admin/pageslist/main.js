import './main.scss'
import pagelist from './js/pagelist'

(function($) {

  const waitnonce = setInterval(() => {

    if(poeticsoft_content_payment_api) {

      clearInterval(waitnonce)

      const $body = $('body')
      if($body.hasClass('edit-php')) {

        pagelist($)
      }
    }
  }, 100)

})(jQuery)



