import {
  formloading,
  priceform
} from './form'
import {
  updatedata,
  getpostprice,
  closepriceforms
} from './utils'

export default ($, $pagesprices, formclass='') => {

  $pagesprices
  .each(function() {
    
    const $this = $(this)
    const id = $this.attr('id').replace('post-', '')
    const $priceform = $this.find('.PriceForm')
    const $edit = $this.find('.Tools .Edit')
    const $close = $this.find('.Tools .Close')  
    
    let $selectors

    $close.on(
      'click',
      function() {        

        $selectors.remove()

        $close.removeClass('Active')
        $edit.addClass('Active')

        return false
      }
    )

    $edit
    .on(
      'click',
      function() {

        $edit.removeClass('Active')
        $close.addClass('Active')

        closepriceforms($, $pagesprices)
    
        $priceform.html(formloading($, formclass))

        getpostprice($, id)
        .then(result => {

          if(result.status == 200) {

            result.json()
            .then(data => {

              $priceform.html(priceform($, data, formclass))
              
              $selectors = $priceform.find('.Selectors')
              const $updating = $selectors.find('.Updating')
              const $save = $selectors.find('.Tools button.Save')

              $save.on(
                'click',
                function() {

                  const $this = $(this)

                  $updating.show()

                  const $radio = $selectors.find('input[type=radio]:checked')
                  const $value = $selectors.find('input[type=number].value')
                  const $discount = $selectors.find('input[type=number].discount')
                  const $radioselector = $radio.parent('.Selector')
                  const data = {
                    postid: id,
                    type: $radio.val()
                  } 

                  /* postid - type - value - discount */

                  switch (data.type) {

                    case 'free':

                      break

                    case 'sum':

                      data.discount = $discount.val() || 0

                      break

                    case 'local':

                      data.value = $value.val() || 0

                      break
                  }

                  updatedata($, $pagesprices, data)
                  .then(() => {

                    $this.blur()
                    $updating.hide()
                    $save.prop('disabled', true)
                  })

                  return false
                }
              )

              const $selector = $selectors.find('.Selector')

              $selectors.on(
                'change',
                'input[type=radio], input[type=number]',
                function() {

                  const $input = $(this)
                  const type = $input.attr('type')
                  
                  if(type == 'radio') {

                    $selector.removeClass('Selected')
                    const $myselector = $input.parent('.Selector')
                    $myselector.addClass('Selected')
                  }     

                  $save.prop('disabled', false)

                  return false
                }
              )
            })
          }
        })

        return false      
      }
    )
  })
  
  updatedata($, $pagesprices) 
}