import form from './forms'
import paychannel from './do-paychannel'

export default $ => {
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const $forms = $postcontent.find('.Forms.ShouldPay')  

  $forms.html(form({ form: 'shouldpay'}))

  const $shouldpay = $forms.find('.Form.ShouldPay')
  const $shouldpaybuy = $shouldpay.find('button.Buy')

  $shouldpaybuy.on(
    'click',
    function() {

      paychannel($)
    }
  )
}