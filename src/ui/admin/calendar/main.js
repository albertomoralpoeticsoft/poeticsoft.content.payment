import './main.scss'
import calendar from './js/calendar'

(function($) {

  if($('body').hasClass('poeticsoft_page_pcpt_calendar')) {

    const waitnonce = setInterval(() => {

      if(poeticsoft_content_payment_api) {

        clearInterval(waitnonce)

        calendar($)
      }
    }, 100)
  }

})(jQuery)



