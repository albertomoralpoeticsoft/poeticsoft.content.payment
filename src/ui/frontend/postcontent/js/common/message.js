

export default ($, message, type) => {
  
  const $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent')
  const $message = $postcontent.find('.Forms .Form .Message')

  $message.removeClass('Error Warn Info')
  $message.addClass(type)
  $message.html(message)
}
