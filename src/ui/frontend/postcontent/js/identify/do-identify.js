import message from '../common/message'
import {
  validatemail
} from '../common/utils'
import {
  apifetch
} from '../common/utils'
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
  const $identifynotregistered = $identify.find('a.NotRegistered')

  function checkemail () {

    const $this = $(this)      
    const email = $this.val()

    if(
      $this[0].checkValidity()
      &&
      validatemail(email)
    ) {

      $identifysendmail.prop('disabled', false)

    } else {

      $identifysendmail.prop('disabled', true)
      
    }

    message($, '', '')
  }

  $identifyemail.on('change', checkemail)
  $identifyemail.on('keydown', checkemail)
  $identifyemail.on('keyup', checkemail)

  $identifynotregistered.on(
    'click',
    function() {

      registerwant($)

      return false
    }
  )

  $identifysendmail.on(
    'click',
    function() {

      const email = $identifyemail.val()

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

        $identifyemail.prop('disabled', true)  
        $identifysendmail.prop('disabled', true)

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
}