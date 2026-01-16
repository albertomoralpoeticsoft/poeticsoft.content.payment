import message from '../common/message'
import {
  apifetch
} from '../common/utils'
import form from './forms'

export default $ => {
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const $forms = $postcontent.find('.Forms.UseTemporalCode')  
  $forms.find('.Form').remove()

  $forms.html(form({ form: 'usetemporalcode'}))

  const $usetemporalcode = $forms.find('.Form.UseTemporalCode')
  const $usetemporalcodecode = $usetemporalcode.find('input.TemporalCode')
  const $usetemporalcodesend = $usetemporalcode.find('button.SendTemporalCode')

  function checkcode () {

    const $this = $(this)      
    const code = $this.val()

    if(code.length > 4) {

      $usetemporalcodesend.prop('disabled', false)

    } else {

      $usetemporalcodesend.prop('disabled', true)
      
    }

    message($, '', '')
  }

  $usetemporalcodecode.on('change', checkcode)
  $usetemporalcodecode.on('keydown', checkcode)
  $usetemporalcodecode.on('keyup', checkcode)

  $usetemporalcodesend.on(
    'click',
    function() {

      const code = $usetemporalcodecode.val()

      message(
        $, 
        'Enviando...', 
        'Warn'
      )

      if(code.length > 4) {

        $usetemporalcodecode.prop('disabled', true)  
        $usetemporalcodesend.prop('disabled', true)

        apifetch({
          url: 'mailrelay/subscriber/checktemporalcode',
          body: {
            code: code
          }
        })
        .then(result => { 

          if(result.result == 'ok') { 

            setTimeout(() => {
              
              window.location.reload()

            }, 2000)

          } else {

            message(
              $, 
              result.message,
              'Error'
            )

            setTimeout(() => {   

              message(
                $, 
                '',
                ''
              )           

              $usetemporalcodecode.prop('disabled', false)  
              $usetemporalcodesend.prop('disabled', false)

            }, 2000)
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