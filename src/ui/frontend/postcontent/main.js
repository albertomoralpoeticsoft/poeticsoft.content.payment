import identify from './js/identify/do-identify'
import shouldpay from './js/shouldpay/do-shouldpay'
import usetemporalcode from './js/identify/do-usetemporalcode'

import './main.scss'

(function($) {

  const waitidentyfyorigin = setInterval(() => {

    if(poeticsoft_content_payment_core_block_postcontent_accesstype_origin) {

      clearInterval(waitidentyfyorigin)     
  
      const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
      
      const $formsusetemporalcode = $postcontent.find('.Forms.UseTemporalCode')  
      const $formsidentify = $postcontent.find('.Forms.Identify')  
      const $formsshouldpay = $postcontent.find('.Forms.ShouldPay') 

      if($formsidentify.length) {

        identify($)
      }  

      if($formsshouldpay.length) {

        shouldpay($)
      }

      if($formsusetemporalcode.length) {

        usetemporalcode($)
      }
    }
  }, 100)

})(jQuery)

