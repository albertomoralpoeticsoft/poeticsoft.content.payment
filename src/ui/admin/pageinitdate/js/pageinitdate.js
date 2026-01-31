
export const pageinitdate = $ =>  {

  let $pageinitdatewrapper = $('#pcp_campus_page_initdate_date .inside .pageinitdatewrapper')
  if($pageinitdatewrapper.length) {

    $pageinitdatewrapper = $pageinitdatewrapper.eq(0)
    
    const $datepicker = $pageinitdatewrapper.find('.DatePicker')
    const $datefield = $pageinitdatewrapper.find('input#pcp_campus_page_initdate_date')
    const $noncefield = $pageinitdatewrapper.find('input#pcp_campus_page_initdate_date_nonce')

    $noncefield.val(poeticsoft_content_payment_api.nonce)

    const savedvalue = $datefield.val()

    $datepicker.datepicker({
      dateFormat: 'yy-mm-dd',
      altField: $datefield,
      altFormat: 'yy-mm-dd'
    })

    if(savedvalue) {

      $datepicker.datepicker(
        'setDate', 
        savedvalue
      )
    }
  }
}