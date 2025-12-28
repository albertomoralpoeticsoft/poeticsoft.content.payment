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
    const $price = $this.find('.Price')
    $price.removeClass('free sum local')
    $price.addClass(type)
    
    const $valuenumber = $price.find('.Value .Number')
    $valuenumber.html(post.value)
  })
}

export const closepriceforms = ($, $pagesprices) => {
  
  $pagesprices
  .each(function() {
    
    const $this = $(this)
    const $edit = $this.find('.Tools .Edit')
    const $close = $this.find('.Tools .Close')  
    const $selectors = $this.find('.PriceForm .Selectors')

    if($selectors.length) {

      $close.removeClass('Active')
      $edit.addClass('Active')
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