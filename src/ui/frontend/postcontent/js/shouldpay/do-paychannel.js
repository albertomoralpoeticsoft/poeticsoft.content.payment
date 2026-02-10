import message from '../common/message'
import form from './forms'
import confirmpaystripe from './do-confirmpay-stripe'
import confirmpaytransfer from './do-confirmpay-transfer'
import confirmpaybizum from './do-confirmpay-bizum'

const confirmpay = {
  stripe: confirmpaystripe,
  transfer: confirmpaytransfer,
  bizum: confirmpaybizum
}

export default ($, $wrapper) => {
  
  const $forms = $wrapper.find('.Forms.ShouldPay')  

  $forms.html(form({ form: 'paychannel'}))

  const $paychannel = $forms.find('.Form.PayChannel')
  const $inputchannels = $paychannel.find('.Channel input[type=radio]')
  const $paychannelpay = $paychannel.find('button.Pay')

  $inputchannels.on(
    'change',
    function() {

      $paychannelpay.prop('disabled', false)
    }
  )

  $paychannelpay.on(
    'click',
    function() {

      const typeselected = $paychannel
      .find('.Channel input[type=radio]:checked')
      .val()

      $inputchannels.prop('disabled', true)
      $paychannelpay.prop('disabled', true)

      message(
        $, 
        $wrapper,
        'Conectando...', 
        'Warn'
      )
      
      confirmpay[typeselected]($)
    }
  )
}