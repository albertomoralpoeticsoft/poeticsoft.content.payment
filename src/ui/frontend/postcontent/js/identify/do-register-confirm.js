import forms from './forms'
import message from './message'
import {
  apifetch
} from './fetch'

export default ($, $wrapper) => {
  
  const $forms = $wrapper.find('.Forms.Identify')  
  $forms.find('.Form').remove()

  $forms.html(forms({ form: 'registerconfirm' }))

  const $coderegister = $forms.find('.Form.RegisterConfirm')
  const $coderegisteremail = $coderegister.find('input.Code')
  const $coderegisterconfirmcode = $coderegister.find('button.ConfirmCode')  
  
  $coderegisterconfirmcode.on(
    'click',
    function() {

      const email = $coderegisteremail.val()
      $coderegisteremail.prop('disabled', true)  
      $coderegisterconfirmcode.prop('disabled', true)

      message(
        $, 
        $wrapper,
        'Confirmando...', 
        'Warn'
      )

      apifetch({
        url: 'identify/subscriber/confirmcode',
        body: {
          email: email
        }
      })
      .then(result => {

        if(result.data.errors) {     

          const errors = 'Error. ' + 
          Object.keys(result.data.errors)
          .map(key => result.data.errors[key].map(e => e + ' '))
          .join(', ')            

          message(
            $, 
            $wrapper,
            errors, 
            'Error'
          )

          $coderegisteremail.prop('disabled', false)  
          $coderegistersendmail.prop('disabled', false)
        } else {

          console.log('Registrado!')
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

        $coderegisteremail.prop('disabled', false)  
        $coderegistersendmail.prop('disabled', false)
      })
    }
  )
}
