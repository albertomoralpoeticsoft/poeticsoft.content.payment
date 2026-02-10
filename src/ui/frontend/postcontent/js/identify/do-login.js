import identify from './do-identify'

export default ($, $mytools) => {  

  const $login = $mytools.find('.Login')

  $login.on(
    'click',
    function() {

      $('body').append(`
        <div class="poeticsoft_content_payment_login_overlay">
          <div class="poeticsoft_content_payment_login">
            <div class="Forms Identify"></div>
            <div class="Close"></div>
          </div>
        </div>
      `)
      
      const $loginwrapper = $('body .poeticsoft_content_payment_login_overlay')
      const $wrapper = $loginwrapper.find('.poeticsoft_content_payment_login')
      const $close = $wrapper.find('.Close')

      identify($, $wrapper)

      $close.on(
        'click',
        function() {

          $loginwrapper.remove()
        }
      )

      return false
    }
  )
}