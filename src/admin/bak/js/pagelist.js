export default $ => {
  
  const urlParams = new URLSearchParams(window.location.search);
  const postStatus = urlParams.get('post_status');
  if (
    postStatus != 'trash'
    &&
    postStatus != 'draft'
  ) {

    $('body').addClass('PoeticsoftContentPayment')

  } else {

    return
  }

  const statusKey = 'PoeticsoftContentPaymentPageListState'
  
  const $thelist = $('body.wp-admin.post-type-page #the-list')

  const $trs = $thelist.find('tr')
  const $trsbyparentid = {}
  $trs.each(function() {

    const $tr = $(this)
    const id = $tr.attr('id')
    const childids = poeticsoft_content_payment_admin_pageslist[id]
    $trsbyparentid[id] = childids.map(cid => $thelist.find('tr#' + cid))
    if(poeticsoft_content_payment_admin_campus_ids.includes(id)) {

      $tr.addClass('InCampus')
    }
  })

  const closebranch = id => {

    const $children = $trsbyparentid[id];
    if(!$children) { return }
    $children.forEach($c => {

      $c.removeClass('Visible Opened')
    })

    const childIds = poeticsoft_content_payment_admin_pageslist[id]
    childIds.length && childIds.forEach(cid => closebranch(cid))
  }  

  let state = {}

  const updateNav = () => {

    $trs.each(function() {

      const $tr = $(this)
      const id = $tr.attr('id')      

      if(state[id]) {

        $tr.addClass('Opened')

        const $children = $trsbyparentid[id];
        $children.forEach($c => {

          $c.addClass('Visible')
        })

        state[id] = true

      } else {

        $tr.removeClass('Opened')

        closebranch(id)
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

  $trs.each(function() {

    const $tr = $(this)
    const id = $tr.attr('id')
    const $title = $tr.find('td.column-title a.row-title')    
    const $titlecontainer = $title.parent('strong')
    const childids = poeticsoft_content_payment_admin_pageslist[id]

    $title.html($title.html().split('— ').join(''))
    $titlecontainer.addClass('TitleContainer')
    
    if(childids.length) {

      $tr.addClass('HasChildren')
      $titlecontainer.prepend('<span class="OpenClose"></span>')
      
    } else {

      $titlecontainer.prepend('<span class="Indent"></span>')
    }

    const $openclose = $titlecontainer.find('.OpenClose')
    $openclose.on(
      'click',
      function() {

        if($tr.hasClass('Opened')) {

          $tr.removeClass('Opened')

          closebranch(id)

          state[id] = false

        } else {

          $tr.addClass('Opened')

          const $children = $trsbyparentid[id];
          $children.forEach($c => {

            $c.addClass('Visible')
          })

          state[id] = true
        }

        saveState()

        return false;
      }
    )
  })
  
  loadState()
}