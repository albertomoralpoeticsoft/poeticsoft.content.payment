import {
  updatedata
} from './utils'

export default $ => {

  if(
    $('body').hasClass('wp-admin')
    &&
    $('body').hasClass('post-type-page')
  ) {

    updatedata($, 'default-pages')
  }
  
  const $pricecolumns = $('.poeticsoft_content_payment_assign_price_column')
  
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
      updatedata($, 'default-pages', data)      
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
      updatedata($, 'default-pages', data) 
    });

    const $inputdiscount = $this
    .find(`input[name=poeticsoft_content_payment_assign_price_discount_${ postid }]`)
    $inputdiscount
    .blur(function() {

      const value = $(this).val();
      const data = {
        postid: postid, 
        discount: value == '' ? 'null' : value
      }
      updatedata($, 'default-pages', data) 
    });
  })
}