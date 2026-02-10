import message from '../common/message'
import {
  apifetch
} from '../common/utils'
import form from './forms'

export default ($, $wrapper) => {
  
  const $forms = $wrapper.find('.Forms.UseTemporalCode')  
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

    message(
      $,
      $wrapper, 
      '', 
      ''
    )
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
        $wrapper, 
        'Enviando...', 
        'Warn'
      )

      if(code.length > 4) {

        $usetemporalcodecode.prop('disabled', true)  
        $usetemporalcodesend.prop('disabled', true)

        apifetch({
          url: 'identify/subscriber/checktemporalcode',
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
              $wrapper, 
              result.message,
              'Error'
            )

            setTimeout(() => {   

              message(
                $, 
                $wrapper,
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