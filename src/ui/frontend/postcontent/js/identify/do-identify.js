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

export default ($, $wrapper) => {

  const accesstype = poeticsoft_content_payment_core_block_postcontent_accesstype_origin
  
  const $forms = $wrapper.find('.Forms.Identify')  
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

    message(
      $, 
      $wrapper, 
      '', 
      ''
    )
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
        $wrapper,
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
          url: 'identify/subscriber/identify',
          body: {
            email: email
          }
        })
        .then(data => {

          if(data.result == 'error') {

            switch (accesstype) {

              case 'gsheets':

                message(
                  $, 
                  $wrapper,
                  'Email no registrado, solicita tu identificación',
                  'Error'
                )

                break

              case 'mailrelay':

                message(
                  $, 
                  $wrapper,
                  'Email no registrado, tienes que registrarte',
                  'Error'
                )

                setTimeout(() => {
                  
                  registershould($, email)
                  
                }, 2000)

                break

              default:

                message(
                  $, 
                  $wrapper,
                  'No hay método de identificación',
                  'Error'
                )

                break
            }

          } else {

            confirmcode(
              $, 
              $wrapper,
              email, 
              data.code
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

          $identifyemail.prop('disabled', false)  
          $identifysendmail.prop('disabled', false)
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