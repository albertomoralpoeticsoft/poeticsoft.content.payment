export const apifetch = (
  url,
  options
) => {

  const callnonce = poeticsoft_content_payment_api.nonce
  const callurl = '/wp-json/poeticsoft/contentpayment/' + url
  const calloptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': callnonce
    },
    method: (options && options.method) || 'GET',
    body: (options && options.body) ?
    JSON.stringify(options.body)
    :
    null
  }

  return fetch(
    callurl,
    calloptions
  )
}