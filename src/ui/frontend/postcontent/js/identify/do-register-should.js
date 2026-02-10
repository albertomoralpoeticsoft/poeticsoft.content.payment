import forms from './forms'
import message from '../common/message'
import confirmcode from './do-confirmcode'
import registerwant from './do-register-want'
import {
  apifetch
} from '../common/utils'

export default ($, $wrapper, email) => {
  
  const $forms = $wrapper.find('.Forms.Identify')  
  $forms.find('.Form').remove()

  $forms.html(forms({ 
    form: 'registershould',
    email: email
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

          $registershouldconfirmcode.prop('disabled', false) 

        } else {

          confirmcode(
            $,  
            $wrapper,
            email, 
            result.usercode
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