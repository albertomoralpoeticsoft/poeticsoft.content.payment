import './view.scss'

(function($) {

  const statusKey = 'PoeticsoftContentPaymentCampusTreeNavState'
  
  const $campustreenav = $('.wp-block-poeticsoft-campustreenav')
  if($campustreenav.length) {

    const $nav = $campustreenav.find('.Nav')
    const $pages = $nav.find('.Page')
    const $opencloses = $nav.find('.OpenClose')

    let state = {}

    const updateNav = () => {

      $pages.each(function() {

        const $this = $(this)

        const id = $this.attr('id')

        if(state[id]) {

          $this.addClass('Visible')
        }
      })
    }

    const loadState = () => {

      state = JSON.parse(localStorage.getItem(statusKey)) || {}

      updateNav()
    }

    const saveState = () => {

      localStorage.setItem(
        statusKey,
        JSON.stringify(state)
      )
    }

    $opencloses.on(
      'click',
      function() {

        const $this = $(this)
        const $page = $this.closest('.Page')
        const id = $page.attr('id')
        if($page.hasClass('Visible')) {

          $page.removeClass('Visible')

          state[id] = false
          
        } else {

          $page.addClass('Visible')
          
          state[id] = true
        }

        saveState()
      }
    )

    loadState()
  }  

})(jQuery)

