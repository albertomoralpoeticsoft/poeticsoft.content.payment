const {
  useReducer,
  useEffect 
} = wp.element
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
  reducer,
  initState
} from './state'
import Modal from './modal'
import {
  admin
} from './admin'

export default () => {

  const [state, dispatch ] = useReducer(
    reducer,
    initState
  )

  const refreshevents = () => {

    apifetch('campus/calendar/events/get')
    .then(response => response.json())
    .then(events => dispatch({
      events: events,
      eventsbygroup: events
      .reduce((eventsbygroup, event) => {

        if(eventsbygroup[event.group]) {

          eventsbygroup[event.group].push(event)

        } else {

          eventsbygroup[event.group] = [event]
        }

        return eventsbygroup
      }, {})
    }))

  }

  useEffect(() => {


  }, [])

  return <div className="">
    <FullCalendar
      plugins={[ 
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        multiMonthPlugin
      ]}
      initialView='multiMonthYear'
      aspectRatio={ 1 }
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'multiMonthYear,dayGridMonth,timeGridWeek,resyncbutton'
      }}
      customButtons={{
        resyncbutton: {
          text: 'Admin',
          click: admin
        }
      }}
      editable={ true }
      events={ state.events }
    />
    <Modal
      state={ state }
      dispatch={ dispatch }
    />
  </div>
};