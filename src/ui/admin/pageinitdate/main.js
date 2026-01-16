import './main.scss'
import {
  pageinitdate
}from './js/pageinitdate'

(function($) {

  const $body = $('body')
    console.log('jarl')

  if($body.hasClass('block-editor-page')) {


    pageinitdate($)
  }

})(jQuery)

