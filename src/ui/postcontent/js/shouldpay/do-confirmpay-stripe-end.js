import form from './forms'

export default ($) => {

  console.log('asdfgadfasd')
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const $forms = $postcontent.find('.Forms.ShouldPay')  

  $forms.html(form({ form: 'confirmpaystripeend' }))

  const $confirmpay = $forms.find('.Form.ConfirmPay')
  const $confirmpayaccess = $confirmpay.find('button.Access')

  $confirmpayaccess.on(
    'click',
    function() {
      
      window.location.reload()
    }
  )
}