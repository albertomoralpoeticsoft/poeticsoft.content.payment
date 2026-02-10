

export default ($, $wrapper, message, type) => {
  
  const $message = $wrapper.find('.Forms .Form .Message')

  $message.removeClass('Error Warn Info')
  $message.addClass(type)
  $message.html(message)
}
