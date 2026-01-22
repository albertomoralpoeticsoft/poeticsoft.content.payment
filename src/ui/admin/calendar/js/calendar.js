
import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import {
  resync,
  validrange,
  receivedtransform,
  fetchCampusEvents,
  onSelectCreateEvent,
  onEventUpdate,
  onEventDelete
} from './ops'

export default $ => {

  let $calendarwrapper = $('#pcpt_admin_calendar.wrap #CalendarWrapper')
  if($calendarwrapper.length) {

    $calendarwrapper = $calendarwrapper.eq(0)
    const calendarelm = $calendarwrapper[0]
    const calendar = new Calendar(
      calendarelm,       
      {
        // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        locale: esLocale,
        plugins: [ 
          interactionPlugin,
          dayGridPlugin,
          timeGridPlugin,
          multiMonthPlugin
        ],
        aspectRatio: 1,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'multiMonthYear,dayGridMonth,timeGridWeek,resyncbutton'
        },
        customButtons: {
          resyncbutton: {
            text: 'Resync',
            click: resync
          }
        },
        defaultAllDay: true,
        forceEventDuration: true,
        eventOverlap: true,
        editable: true,
        eventDataTransform: receivedtransform,
        validRange: validrange,
        events: fetchCampusEvents,
        select: onSelectCreateEvent,        
        eventDrop: onEventUpdate,
        eventResize: onEventUpdate,
        eventClick: onEventDelete
      }
    )
    calendar.render()
  }
}