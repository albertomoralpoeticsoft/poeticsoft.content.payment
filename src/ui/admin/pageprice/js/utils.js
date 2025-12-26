const fetchheaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-WP-Nonce': poeticsoft_content_payment_admin.nonce
}

export const updateSumas = ($, $pagesprices, posts) => { 

  $pagesprices
  .each(function() {

    const $this = $(this)
    const id = $this.attr('id').replace('post-', '')
    const post = posts[id]
    const type = post.type
    $this.find('.Price').addClass(type)
  })
      
  // Object.keys(posts)
  // .forEach(key => {

  //   const $precio = $('#post-' + key + ' .Precio')
  //   $precio.addClass(posts[key].type)
  //   const $value = $precio.find('.Number')
  //   $value.html(posts[key].value)
  // })
}

export const closepriceforms = ($, $pagesprices) => {
  
  $pagesprices
  .each(function() {
    
    const $this = $(this)
    const $selectors = $this.find('.PriceForm .Selectors')

    if($selectors.length) {

      $selectors.remove()
    }
  })
}

export const getpostprice = ($, postid) => {
  
  return fetch(
    '/wp-json/poeticsoft/contentpayment/price/getprice?postid=' + postid,
    {
      method: "GET",
      headers: fetchheaders
    }
  )
  .catch(error => console.log(error))
}

export const updatedata = ($, $pagesprices, data) => {
  
  return fetch(
    '/wp-json/poeticsoft/contentpayment/price/changeprice',
    {
      method: "POST",
      headers: fetchheaders,
      body: JSON.stringify(data)
    }
  )
  .then(
    result => {

      result.json()
      .then(data => {

        if(data.code == 'ok') {

          updateSumas($, $pagesprices, data.posts)
        
        } else {

          console.log(data)
        }
      })
    }
  )
  .catch(error => console.log(error))
}