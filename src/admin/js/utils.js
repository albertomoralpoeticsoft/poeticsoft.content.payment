export const updateSumas = ($, adminpage, posts) => {

  switch(adminpage) {
    
    case 'default-pages':
      
      Object.keys(posts)
      .forEach(key => {

        const $suma = $('.poeticsoft_content_payment_assign_price_column .Suma_' + key)
        $suma.html(posts[key].value)
      })

      break

    case 'nested-pages':
      
      Object.keys(posts)
      .forEach(key => {

        const $precio = $('#post-' + key + ' .Precio')
        $precio.addClass(posts[key].type)
        const $value = $precio.find('.Suma')
        $value.html(posts[key].value)
      })
      
      break
  }
}

export const updatedata = ($, adminpage, data) => {
  
  fetch(
    '/wp-json/poeticsoft/contentpayment/price/changeprice',
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
  .then(
    result => {

      result.json()
      .then(data => {

        if(data.code == 'ok') {

          updateSumas($, adminpage, data.posts)
        
        } else {

          console.log(data)
        }
      })
    }
  )
  .catch(error => console.log(error))
}

export const getPostPrice = ($, postid) => {
  
  return fetch(
    '/wp-json/poeticsoft/contentpayment/price/getprice?postid=' + postid,
    {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  .catch(error => console.log(error))
}