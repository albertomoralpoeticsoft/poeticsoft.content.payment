import {
  rowform,
  priceform,
  priceformload
} from './form'
import {
  updatedata,
  getPostPrice
} from './utils'

export default ($, $pageprices) => {

  console.log($pageprices)

  return
  
  // let $pageslist = $('#the-list')
  // if($pageslist.length) {

  //   $pageslist = $pageslist.eq(0)

  //   const closeSelectors = () => {

  //     $pageslist
  //     .find('li.page-row .PCPPrice .PriceForm .Selectors')
  //     .remove()
  //   }

  //   const $pagerows = $pageslist.find('> tr')
  //   $pagerows
  //   .each(function() {

  //     const $pagerow = $(this)
  //     const id = $pagerow.attr('id').replace('post-', '')
  //     const postid = 'post-' + id

  //     if(poeticsoft_content_payment_admin_campus_ids.includes(postid)) {

  //       const $tdtitle = $pagerow.find('> .page-title')
  //       $bulkcheckbox.after(rowform($, postid, 'td'))
  //       const $pcpprice = $row.find('.PCPPrice')

        $pageprices
        .on(
          'click',
          function() {

            // closeSelectors()

            const $this = $(this)
            const $priceform = $this.find('.PriceForm')

            $priceform.html(priceformload($))

            getPostPrice($, id)
            .then(result => {

              if(result.status == 200) {

                result.json()
                .then(data => {

                  $priceform.html(priceform($, data))  

                  const $selectors = $priceform.find('.Selectors')
                  const $radios = $selectors.find('input[type=radio]')
                  const $selected = $selectors.find('.Selector.' + data.type).eq(0)
                  $selected.addClass('Selected')
                  $selected.find('input.type').prop('checked', true)

                  $radios.on(
                    'click',
                    function() {

                      const $this = $(this)
                    }
                  )
                  /* ---------------------------------- */

                  $selectors.on('click', function() { return false })

                  const $close = $selectors.find('.Tools button.Close')
                  $close.on(
                    'click',
                    function() {

                      $selectors.remove()

                      return false
                    }
                  )
                })
              }

            })

            return false
          }
        )
    //   }
    // })

    // updatedata($, 'nested-pages') 
  // }
}