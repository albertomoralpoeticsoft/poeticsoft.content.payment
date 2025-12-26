import forms from './forms'
import message from '../common/message'
import {
  apifetch
} from '../common/fetch'

export default ($, email, code) => {
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const $forms = $postcontent.find('.Forms.Identify')  
  $forms.find('.Form').remove()

  $forms.html(forms({ 
    form: 'confirmcode',
    code: code
  }))

  const $codeconfirm = $forms.find('.Form.ConfirmCode')
  const $codeconfirminput = $codeconfirm.find('input.Code')
  const $codeconfirmconfirmcode = $codeconfirm.find('button.ConfirmCode') 
  const $identifyresendcode = $codeconfirm.find('a.ResendCode')
  
  $codeconfirmconfirmcode.on(
    'click',
    function() {

      const code = $codeconfirminput.val()
      $codeconfirminput.prop('disabled', true)  
      $codeconfirmconfirmcode.prop('disabled', true)

      message(
        $, 
        'Confirmando...', 
        'Warn'
      )

      apifetch({
        url: 'mailrelay/subscriber/confirmcode',
        body: {
          email: email,
          code: code
        }
      })
      .then(data => {

        if(data.result == 'ok') {          

          message(
            $, 
            'Identifiación confirmada. Redirigiendo a la página de contenidos', 
            'Info'
          )

          setTimeout(() => {
            
            window.location.reload()

          }, 2000)

        } else {

          console.log(data)

          message(
            $, 
            data.message, 
            'Error'
          )
        }

        $codeconfirminput.prop('disabled', false)  
        $codeconfirmconfirmcode.prop('disabled', false)

      })
      .catch(error => {

        console.log(error)

        message(
          $, 
          'Error de servidor, intentalo de nuevo, por favor.',
          'Error'
        )

        $codeconfirminput.prop('disabled', false)  
        $codeconfirmconfirmcode.prop('disabled', false)
      })
    }
  )  

  $identifyresendcode.on(
    'click',
    function() {     

      $codeconfirminput.val('')
      $codeconfirminput.prop('disabled', false)  
      $codeconfirmconfirmcode.prop('disabled', false)   

      message(
        $, 
        'Reenviando...', 
        'Warn'
      )

      apifetch({
        url: 'mailrelay/subscriber/identify',
        body: {
          email: email
        }
      })
      .then(data => {

        if(data.result == 'ok') {
          
          $codeconfirminput.val(data.code)

          message(
            $, 
            'Se ha reenviado el código.',
            'Info'
          )
        }

      })
      .catch(error => {

        console.log(error)

        message(
          $, 
          'Error de servidor, intentalo de nuevo, por favor.',
          'Error'
        )

        $codeconfirminput.prop('disabled', false)  
        $codeconfirmconfirmcode.prop('disabled', false)
      })

      return false
    }
  )
}
