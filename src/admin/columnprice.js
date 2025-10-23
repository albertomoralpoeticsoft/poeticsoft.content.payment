export default $ => {
  
  const $pricecolumns = $('.poeticsoft_content_payment_assign_price_column')

  const updateSumas = data => {

    Object.keys(data)
    .forEach(key => {

      const $suma = $('.poeticsoft_content_payment_assign_price_column .' + key)
      $suma.html(data[key])
    })
  }
  
  $pricecolumns
  .each(function() {

    const $this = $(this)
    const postid = $this.data('postid')

    const $radiotype = $this.find(`input:radio[name=poeticsoft_content_payment_assign_price_type_${ postid }]`)

    $radiotype
    .click(function() {

      var type = $(this).val();
      fetch(
        '/wp-json/poeticsoft/contentpayment/price/savedata',
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            postid: postid, 
            type: type
          })
        }
      )
      .then(
        result => {

          result.json()
          .then(data => {

            updateSumas(data)
          })
        }
      )
    });

    const $inputvalue = $this.find(`input[name=poeticsoft_content_payment_assign_price_value_${ postid }]`)

    $inputvalue
    .blur(function() {

      var value = $(this).val();

      fetch(
        '/wp-json/poeticsoft/contentpayment/price/savedata',
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            postid: postid, 
            value: value == '' ? 'null' : value
          })
        }
      )
      .then(
        result => {

          result.json()
          .then(data => {

            updateSumas(data)
          })
        }
      )
    });

  })
}