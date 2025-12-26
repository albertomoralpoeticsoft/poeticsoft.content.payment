import {
  rowform 
} from './form' 

export const editpageprice = $ =>  {

  let $pagepricewrapper = $('#poeticsoft_content_payment_page_assign_price .inside .pricewrapper')
  if($pagepricewrapper.length) {
    
    $pagepricewrapper = $pagepricewrapper.eq(0)
    const postid = $pagepricewrapper.data('id')
    $pagepricewrapper.html(rowform($, postid))
    const $pagerows = $pagepricewrapper.find('.PCPPrice');

    return $pagerows
  }
}

export const normalpagesprices = $ =>  {

  let $pageslist = $('#the-list')
  if($pageslist.length) {
    
    $pageslist = $pageslist.eq(0)
    const $pagerows = $.map(
      $pageslist
      .find('> tr')
      .filter(
        function() {

          const $pagerow = $(this)
          const postid = $pagerow.attr('id')
          const id = postid.replace('post-', '')

          return poeticsoft_content_payment_admin_campus_ids.includes(postid)
        }
      ),
      function(elm) {

        const $pagerow = $(elm)
        const postid = $pagerow.attr('id')
        const $tdtitle = $pagerow.find('> .page-title')
        $tdtitle.after(rowform($, postid, 'td'))
        const $pcpprice = $pagerow.find('.PCPPrice').eq(0)
        
        return $pcpprice
      }
    )

    return $pagerows
  }

  return null
} 

export const nestedpagesprices =  $ =>  {

  let $nestedpages = $('.wrap.nestedpages')
  if($nestedpages.length) {

    $nestedpages = $nestedpages.eq(0)
    const $pagerows = $.map(
      $nestedpages
      .find('li.page-row')
      .filter(
        function() {

          const $pagerow = $(this)
          const id = $pagerow.attr('id').replace('menuItem_', '')
          const postid = 'post-' + id

          return poeticsoft_content_payment_admin_campus_ids.includes(postid)
        }
      ),
      function(elm) {
        
        const $pagerow = $(elm)
        const id = $pagerow.attr('id').replace('menuItem_', '')
        const postid = 'post-' + id
        const $row = $pagerow.find('> .row')
        const $bulkcheckbox = $row.find('.np-bulk-checkbox')
        $bulkcheckbox.before(rowform($, postid, 'div'))
        const $pcpprice = $row.find('.PCPPrice').eq(0)

        return $pcpprice
      }
    )

    return $pagerows
  }  

  return null
}