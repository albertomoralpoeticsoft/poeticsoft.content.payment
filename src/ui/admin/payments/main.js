const { 
  render 
} = wp.element;
import APP from './js/app'
import './main.scss'

const init = () => {

  render(
    <APP />,
    document.getElementById('PaymentsAPP')
  )
}

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    init
  )

} else {

  init();
}