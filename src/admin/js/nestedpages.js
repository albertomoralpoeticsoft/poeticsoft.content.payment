import {
  rowform,
  priceform,
} from './form'
import {
  updatedata
} from './utils'

export default $ => {
  
  let $nestedpages = $('.wrap.nestedpages')
  if($nestedpages.length) {

    $nestedpages = $nestedpages.eq(0)

    const $pagerows = $nestedpages.find('li.page-row')

    $pagerows
    .each(function() {

      const $pagerow = $(this)
      const postid = 'post-' + $pagerow.attr('id').replace('menuItem_', '')

      if(poeticsoft_content_payment_admin_campus_ids.includes(postid)) {

        const $row = $pagerow.find('> .row')
        const $bulkcheckbox = $row.find('.np-bulk-checkbox')
        $bulkcheckbox.before(rowform($, postid))

        const $pcpprice = $bulkcheckbox.find('.PCPPRice')
        $pcpprice
        .on(
          'click',
          function() {

            console.log('PCPPrice')

          const $this = $('this')
          const $priceform = $this.find('.PriceForm')

          const post = poeticsoft_content_payment_admin_campus_ids[postid]

          $priceform.html(priceform($, post))  
        })
      }
    })

    updatedata($, 'nested-pages') 
  }
}