import form from './forms'
import paychannel from './do-paychannel'

export default ($, $wrapper) => {

  const $advicetext = $wrapper.find('.AdviceText')
  const advicetext = $advicetext.html()  
  const $forms = $wrapper.find('.Forms.ShouldPay')  

  $forms.html(form({ 
    form: 'shouldpay',
    advicetext: advicetext
  }))

  const $shouldpay = $forms.find('.Form.ShouldPay')
  const $shouldpaybuy = $shouldpay.find('button.Buy')

  $shouldpaybuy.on(
    'click',
    function() {

      paychannel($)
    }
  )
}