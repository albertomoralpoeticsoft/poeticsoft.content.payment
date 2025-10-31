import message from '../common/message'
import {
  validatemail
} from '../common/utils'
import {
  apifetch
} from '../common/fetch'
import form from './forms'
import confirmcode from './do-confirmcode'
import registershould from './do-register-should'
import registerwant from './do-register-want'

export default $ => {
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const $forms = $postcontent.find('.Forms.Identify')  
  $forms.find('.Form').remove()

  $forms.html(form({ form: 'identify'}))

  const $identify = $forms.find('.Form.Identify')
  const $identifyemail = $identify.find('input.Email')
  const $identifysendmail = $identify.find('button.SendEmail')
  const $identifynotregistered = $identify.find('.NotRegistered a')

  $identifyemail.on(
    'keydown',
    function() {

      setMessage($, '', '')
    }
  )

  $identifysendmail.on(
    'click',
    function() {

      const email = $identifyemail.val()
      $identifyemail.prop('disabled', true)  
      $identifysendmail.prop('disabled', true)

      message(
        $, 
        'Enviando...', 
        'Warn'
      )

      if(
        $identifyemail[0].checkValidity()
        &&
        validatemail(email)
      ) {

        apifetch({
          url: 'mailrelay/subscriber/identify',
          body: {
            email: email
          }
        })
        .then(result => {

          if(result.data == 'notfound') {

            registershould($, email)

          } else {

            confirmcode($, email, result.code)
          }

        })
        .catch(error => {

          console.log(error)

          message(
            $, 
            'Error de servidor, intentalo de nuevo, por favor.',
            'Error'
          )

          $identifyemail.prop('disabled', false)  
          $identifysendmail.prop('disabled', false)
        })

      } else {

        message(
          $, 
          'El mail no es válido.', 
          'Error'
        )
      }
    }
  )

  $identifynotregistered.on(
    'click',
    function() {

      registerwant($)

      return false
    }
  )
}