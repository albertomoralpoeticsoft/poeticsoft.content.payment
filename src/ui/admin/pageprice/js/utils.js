const fetchheaders = () => {
  
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-WP-Nonce': poeticsoft_content_payment_api.nonce
  }
}

export const updatefree = ($, id, ischecked) => {

  const data = {
    postid: id,
    isfree: ischecked
  }
  
  return fetch(
    '/wp-json/poeticsoft/contentpayment/state/updatefree',
    {
      method: "POST",
      headers: fetchheaders(),
      body: JSON.stringify(data)
    }
  )
  .catch(error => console.log(error))
}

export const updatedata = ($, $pagesprices) => {
  
  return fetch(
    '/wp-json/poeticsoft/contentpayment/state/getfree',
    {
      method: "GET",
      headers: fetchheaders()
    }
  )
  .then(
    result => {

      result.json()
      .then(data => {

        $pagesprices
        .each(function() {
          
          const $this = $(this)
          const id = $this.attr('id').replace('post-', '')
          const $tooglefree = $this.find('.PriceTools .Access input.IsFree')
          const $tooglelabel = $this.find('.PriceTools .Access label')

          if(data[id] == 'free') {
            
            $tooglefree.prop("checked", true);
            $tooglelabel.html('Abierta')
            $tooglelabel.addClass('Free')

          } else {
            
            $tooglelabel.html('Paid')
          }
        })
      })
    }
  )
  .catch(error => console.log(error))
}