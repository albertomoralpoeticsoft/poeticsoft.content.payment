export default $ => {
  
  const $pricecolumns = $('.poeticsoft_content_payment_assign_price_column')

  const updateSumas = posts => {

    Object.keys(posts)
    .forEach(key => {

      const $suma = $('.poeticsoft_content_payment_assign_price_column .Suma_' + key)
      $suma.html(posts[key].value)
    })
  }

  const updatedata = data => {
    
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

            updateSumas(data.posts)
          
          } else {

            console.log(data)
          }
        })
      }
    )
  }

  if(
    $('body').hasClass('wp-admin')
    &&
    $('body').hasClass('post-type-page')
  ) {

    updatedata()
  }
  
  $pricecolumns
  .each(function() {

    const $this = $(this)
    const postid = $this.data('postid')

    const $precio = $this.find('.Precio')
    const $selectors = $this.find('.Selectors')

    $precio
    .on(
      'click',
      function() {

        const $this = $(this)

        $this.toggleClass('Opened')
        $selectors.toggleClass('Opened')
      }
    )

    const $radiotype = $this
    .find(`input:radio[name=poeticsoft_content_payment_assign_price_type_${ postid }]`)
    $radiotype
    .click(function() {

      const $input = $(this)

      const $p = $input.parent()
      const $ps = $p.siblings('p.Selector')
      const $valueinputs = $ps.find('input[type=number]')
      const $valueinput = $p.find('input[type=number]')
      const pricetype = $input.data('type')

      $precio.removeClass('free sum local')
      $precio.addClass(pricetype)

      $ps.removeClass('Selected')
      $p.addClass('Selected')
      $valueinputs.prop('disabled', true)
      $valueinput.prop('disabled', false)

      const type = $(this).val()
      const data = {
        postid: postid, 
        type: type
      }
      updatedata(data)      
    });

    const $inputvalue = $this
    .find(`input[name=poeticsoft_content_payment_assign_price_value_${ postid }]`)
    $inputvalue
    .blur(function() {

      const value = $(this).val();
      const data = {
        postid: postid, 
        value: value == '' ? 'null' : value
      }
      updatedata(data) 
    });
  })
}