export const apifetch = data => {

  return new Promise(
    (resolve, reject) => {

      fetch(
        '/wp-json/poeticsoft/contentpayment/' + data.url,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-WP-Nonce': poeticsoft_content_payment_ui.nonce
          },
          body: JSON.stringify(data.body)
        }
      )
      .then(
        result => {

          result.json()
          .then(data => resolve(data))
        }
      )
      .catch(error => {

        console.log(error)
        
        reject(error)
      }) 
    }
  )
}