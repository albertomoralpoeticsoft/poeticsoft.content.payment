import forms from './forms'
import message from './message'
import {
  apifetch
} from './fetch'

export default $ => {
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const $forms = $postcontent.find('.Forms.Identify')  
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
          'Error de servidor, intentalo de nuevo, por favor.',
          'Error'
        )

        $coderegisteremail.prop('disabled', false)  
        $coderegistersendmail.prop('disabled', false)
      })
    }
  )
}
