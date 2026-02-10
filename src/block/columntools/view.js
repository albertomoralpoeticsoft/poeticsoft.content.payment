import './view.scss'

(function($) {

  const $columntools = $('.wp-block-poeticsoft-columntools')
  if($columntools.length) {

    $columntools
    .each(function() {

      const $this = $(this)
      const $column = $this.parent('.wp-block-column')

      $this.on(
        'click',
        function() {
    
          if($column.hasClass('Open'))  {

            $column.removeClass('Open')
            $column.addClass('Closed')

            localStorage.setItem(
              statusKey,
              'Closed'
            )

          } else {

            $column.removeClass('Closed')
            $column.addClass('Open')

            localStorage.setItem(
              statusKey,
              'Open'
            )
          }
        }
      )

      const statusKey = 'PoeticsoftContentPaymentColumnTools'
      const state = localStorage.getItem(statusKey)

      if(state) {

        $column.addClass(state)

      } else {

        if($this.data('defaultopen')) {

          $column.addClass('Open')
          
        } else {

          $column.addClass('Closed')
        }
      }
    })
  }  

})(jQuery)

