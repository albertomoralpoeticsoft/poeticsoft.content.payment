import message from '../common/message'
import form from './forms'
import {
  apifetch
} from '../common/fetch'
import confirmpaystripeend from './do-confirmpay-stripe-end'

export default ($, paytype) => {
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const postcontentdata = $postcontent.data()
  const $forms = $postcontent.find('.Forms.ShouldPay')  

  $forms.html(form({ form: 'confirmpaystripe' }))

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
        'Conectando con Stripe...', 
        'Warn'
      )

      apifetch({
        url: 'pay/init',
        body: {
          type: 'stripe',
          email: postcontentdata.email,
          postid: postcontentdata.postid
        }
      })
      .then(data => { 
        
        window.open(
          data.stripesession.url,
          'STRIPE',
          'width=1080,height=800'
        );
      
        message(
          $, 
          'Esperando confirmación de pago, no cierres esta ventana...', 
          'Warn'
        )

        const waitStripe = setInterval(() => {

          apifetch({
            url: 'pay/stripe/session/check',
            body: {
              stripesessionid: data.stripesession.id
            }
          })
          .then(result => {

            if(result.done) {

              clearInterval(waitStripe)

              confirmpaystripeend($)
            }
          })

        }, 3000)

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
    }
  )
}