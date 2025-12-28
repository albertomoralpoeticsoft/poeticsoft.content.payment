import './main.scss'
import pagelist from './js/pagelist'

(function($) {

  const $body = $('body')
  if($body.hasClass('edit-php')) {

    pagelist($)
  }

})(jQuery)



