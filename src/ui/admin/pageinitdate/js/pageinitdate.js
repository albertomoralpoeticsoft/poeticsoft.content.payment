
export const pageinitdate = $ =>  {

  let $pageinitdatewrapper = $('#poeticsoft_content_payment_page_assign_init_date .inside .pageinitdatewrapper')
  if($pageinitdatewrapper.length) {

    $pageinitdatewrapper = $pageinitdatewrapper.eq(0)

    console.log($pageinitdatewrapper)
    
    const $datepicker = $pageinitdatewrapper.find('.DatePicker')

    console.log($datepicker.datepicker)

    $datepicker.datepicker()
  }
}