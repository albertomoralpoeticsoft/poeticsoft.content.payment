import form from './forms'

export default ($, $wrapper) => {
  
  const $forms = $wrapper.find('.Forms.ShouldPay')  

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