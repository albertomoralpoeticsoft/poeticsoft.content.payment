import forms from './forms'
import message from '../common/message'
import confirmcode from './do-confirmcode'
import registerwant from './do-register-want'
import {
  apifetch
} from '../common/fetch'

export default ($, email) => {
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const $forms = $postcontent.find('.Forms.Identify')  
  $forms.find('.Form').remove()

  $forms.html(forms({ 
    form: 'registershould',
    email: email,
    usercode: usercode
  }))  

  const $registershould = $forms.find('.Form.RegisterShould')
  const $registershouldconfirmcode = $registershould.find('button.RegistryEmail')  
  const $registershouldothermail = $registershould.find('a.OtherMail') 

  $registershouldconfirmcode.on(
    'click',
    function() {

      $registershouldconfirmcode.prop('disabled', true)  
    
      message(
        $, 
        'Enviando...', 
        'Warn'
      )

      apifetch({
        url: 'mailrelay/subscriber/register',
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

          $registershouldconfirmcode.prop('disabled', false) 

        } else {

          confirmcode($, email)
        }
      })
      .catch(error => {

        console.log(error)

        message(
          $, 
          'Error de servidor, intentalo de nuevo, por favor.',
          'Error'
        )

        $registerwantemail.prop('disabled', false)  
        $registerwantsendmail.prop('disabled', false)
      })
    }
  )

  $registershouldothermail.on(
    'click',
    function() {
      
      registerwant($)      

      return false
    }
  )
}