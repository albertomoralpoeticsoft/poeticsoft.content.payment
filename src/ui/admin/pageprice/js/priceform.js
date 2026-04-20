import {
  updatefree,
  updatedata
} from './utils'

export default ($, $pagesprices, formclass='') => {

  $pagesprices
  .each(function() {
    
    const $this = $(this)
    const id = $this.attr('id').replace('post-', '')
    const $tooglefree = $this.find('.PriceTools .Access input.IsFree')
    const $tooglelabel = $this.find('.PriceTools .Access label')

    $tooglefree
    .on(
      'click',
      function() {

        const $this = $(this)
        const ischecked = $this.is(':checked')

        $tooglelabel.removeClass('Free')
        $tooglelabel.addClass('Updating')
        $tooglelabel.html('Actualizando')

        updatefree($, id, ischecked) 
        .then(result => {

          if(result.status == 200) {

            result.json()
            .then(data => {
              
              $tooglelabel.removeClass('Updating')

              if(data.type == 'free') {

                $tooglelabel.addClass('Free')
                $tooglelabel.html('Free')

              } else {

                $tooglelabel.html('Paid')
              }
            })
          }
        })
      }
    )
  })
  
  updatedata($, $pagesprices)
}