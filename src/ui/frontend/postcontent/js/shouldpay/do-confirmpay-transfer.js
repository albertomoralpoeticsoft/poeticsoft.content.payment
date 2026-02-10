import message from '../common/message'
import form from './forms'
import {
  apifetch
} from '../common/utils'
import paychannel from './do-paychannel'

export default ($, $wrapper)=> {
  
  const postcontentdata = $wrapper.data()
  const $forms = $postcontent.find('.Forms.ShouldPay')  

  $forms.html(form({ form: 'confirmpaytransfer' }))

  const $confirmpay = $forms.find('.Form.ConfirmPay')
  const $confirmpaypay = $confirmpay.find('button.Pay')
  const $confirmpayother = $confirmpay.find('a.OtherChannel')
  
  let allowBack = true
  $confirmpayother.on(
    'click',
    function() {
    
      allowBack && paychannel($)
    }
  )

  $confirmpaypay.on(
    'click',
    function() {        
    
      $confirmpaypay.prop('disabled', true)
      $confirmpayother.addClass('Disabled')
      
      allowBack = false
      
      message(
        $, 
        $wrapper,
        'Enviando...', 
        'Warn'
      )

      apifetch({
        url: 'pay/init',
        body: {
          type: 'transfer',
          email: postcontentdata.email,
          postid: postcontentdata.postid
        }
      })
      .then(data => {   
      
        $forms.html(form({ 
          form: 'confirmpaytransferend',
          result: data
        }))

      })
      .catch(error => {

        console.log(error)

        message(
          $, 
          $wrapper,
          'Error de servidor, intentalo de nuevo, por favor.',
          'Error'
        )   

        $confirmpaypay.prop('disabled', false)
        $confirmpayother.removeClass('Disabled')
        
        allowBack = true
      })
    }
  )

  $confirmpayother.on(
    'click',
    function() {

      paychannel($)

      return false
    }
  )
}