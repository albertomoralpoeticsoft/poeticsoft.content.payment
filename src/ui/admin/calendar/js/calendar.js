const { 
  render 
} = wp.element;
import APP from './app'

export default () => {

  render(
    <APP />,
    document.getElementById('CalendarWrapper')
  )
}