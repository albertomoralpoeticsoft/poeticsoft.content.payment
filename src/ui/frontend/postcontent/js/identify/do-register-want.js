import {
  validatemail
} from '../common/utils'
import forms from './forms'
import message from '../common/message'
import identify from './do-identify'
import confirmcode from './do-confirmcode'
import {
  apifetch
} from '../common/utils'

export default ($, $wrapper) => {
  
  const $forms = $wrapper.find('.Forms.Identify')  
  $forms.find('.Form').remove()

  $forms.html(forms({ form: 'registerwant' }))

  const $registerwant = $forms.find('.Form.RegisterWant')
  const $registerwantemail = $registerwant.find('input.Email')
  const $registerwantsendmail = $registerwant.find('button.SendEmail')  
  const $registerwantbackidentify = $registerwant.find('a.BackIdentify') 
  
  function checkemail () {

    const $this = $(this)      
    const email = $this.val()

    if(
      $this[0].checkValidity()
      &&
      validatemail(email)
    ) {

      $registerwantsendmail.prop('disabled', false)

    } else {

      $registerwantsendmail.prop('disabled', true)
      
    }

    message(
      $, 
      $wrapper,
      '', 
      ''
    )
  } 

  $registerwantemail.on('keydown', checkemail)
  $registerwantemail.on('change', checkemail)

  $registerwantbackidentify.on(
    'click',
    function() {

      identify($)

      return false
    }
  )
  
  $registerwantsendmail.on(
    'click',
    function() {

      const email = $registerwantemail.val()

      if(
        $registerwantemail[0].checkValidity()
        &&
        validatemail(email)
      ) {

        $registerwantemail.prop('disabled', true)  
        $registerwantsendmail.prop('disabled', true)

        message(
          $, 
          $wrapper,
          'Enviando...', 
          'Warn'
        )

        apifetch({
          url: 'identify/subscriber/register',
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

            $registerwantemail.prop('disabled', false)  
            $registerwantsendmail.prop('disabled', false)

          } else {

            confirmcode(
              $,  
              $wrapper,
              email
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

          $registerwantemail.prop('disabled', false)  
          $registerwantsendmail.prop('disabled', false)
        })

      } else {

        message(
          $, 
          $wrapper,
          'El mail no es válido.', 
          'Error'
        )
      }
    }
  )
}
