export default $ => {
  
  const $thelist = $('body.wp-admin.post-type-page #the-list')

  const $trs = $thelist.find('tr')
  $trs.each(function() {

    const $this = $(this)

    const $title = $this.find('td.column-title a.row-title')
    const $titlecontainer = $title.parent('strong')

    $titlecontainer.addClass('TitleContainer')
    $titlecontainer.prepend('<span class="OpenClose"></span>')

    const $openclose = $titlecontainer.find('.OpenClose')

    $openclose.on(
      'click',
      function() {

        $this.toggleClass('Opened')

        return false;
      }
    )
  })
}