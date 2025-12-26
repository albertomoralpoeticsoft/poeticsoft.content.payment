import identify from './js/identify/do-identify'
import shouldpay from './js/shouldpay/do-shouldpay'

import './main.scss'

(function($) {
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const $formsidentify = $postcontent.find('.Forms.Identify')  
  const $formsshouldpay = $postcontent.find('.Forms.ShouldPay') 

  if($formsidentify.length) {

    identify($)
  }  

  if($formsshouldpay.length) {

    shouldpay($)
  }

})(jQuery)

