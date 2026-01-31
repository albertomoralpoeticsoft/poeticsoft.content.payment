import './main.scss'
import calendar from './js/calendar'
import './main.scss'

(function($) {

  const waitnonce = setInterval(() => {

    if(poeticsoft_content_payment_api) {

      clearInterval(waitnonce)

      if($('body').hasClass('poeticsoft_page_pcp_calendar')) {

        let $calendarwrapper = $('#pcp_admin_calendar.wrap #CalendarWrapper')
        if($calendarwrapper.length) {

          calendar($)
        }
      }
    }

  }, 100)

})(jQuery)



