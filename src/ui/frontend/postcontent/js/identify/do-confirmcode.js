import forms from './forms'
import message from '../common/message'
import {
  apifetch
} from '../common/utils'

export default ($, $wrapper, email, code) => {
  
  const $forms = $wrapper.find('.Forms.Identify')  
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
        $wrapper,
        'Confirmando...', 
        'Warn'
      )

      apifetch({
        url: 'identify/subscriber/confirmcode',
        body: {
          email: email,
          code: code
        }
      })
      .then(data => {

        if(data.result == 'ok') {          

          message(
            $, 
            $wrapper,
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
            $wrapper,
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
          $wrapper,
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
        $wrapper,
        'Reenviando...', 
        'Warn'
      )

      apifetch({
        url: 'identify/subscriber/identify',
        body: {
          email: email
        }
      })
      .then(data => {

        if(data.result == 'ok') {
          
          $codeconfirminput.val(data.code)

          message(
            $, 
            $wrapper,
            'Se ha reenviado el código.',
            'Info'
          )
        }

      })
      .catch(error => {

        console.log(error)

        message(
          $, 
          $wrapper,
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
