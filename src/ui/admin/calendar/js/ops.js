import { apifetch } from 'uiutils/api'

export const receivedtransform = data => {

  const transformeddata = {
    id: data.id,
    overlap: data.overlap == "1",

    title: data.title,
    // url: null, //data.url,
    interactive: false, // data.interactive == "1",

    groupId: data.groupId,
    allDay: data.allDay == "1",
    start: data.start ? parseInt(data.start) : null,
    end: data.end ? parseInt(data.end) : null,
    daysOfWeek: data.daysOfWeek ? JSON.parse(data.daysOfWeek) : null,
    startTime: data.startTime ? parseInt(data.startTime) : null,
    endTime: data.endTime ? parseInt(data.endTime) : null,
    startRecur: data.startRecur ? parseInt(data.startRecur) : null,
    endRecur: data.endRecur ? parseInt(data.endRecur) : null,

    editable: data.editable == "1",
    startEditable: data.startEditable,
    durationEditable: data.durationEditable,
    resourceEditable: data.resourceEditable,
    resourceId: data.resourceId,
    resourceIds: data.resourceIds,

    display: data.display,
    restriction: data.restriction,
    className: data.className,
    color: data.color,
    backgroundColor: data.backgroundColor,
    borderColor: data.borderColor,
    textColor: data.textColor,
    extendedProps: data.extendedProps ? JSON.parse(data.extendedProps) : null,
    
    state: data.state
  }

  return transformeddata
}

export const senttransform = data => {
  
  const transformeddata = {

    overlap: false, // data.overlap,

    title: data.title,
    url: data.url,
    interactive: data.interactive,

    groupId: data.groupId,
    allDay: data.allDay,
    start: data.start,
    end: data.end,
    daysOfWeek: data.daysOfWeek ? JSON.stringify(data.daysOfWeek) : null,
    startTime: data.startTime,
    endTime: data.endTime,
    startRecur: data.startRecur,
    endRecur: data.endRecur,

    editable: data.editable,
    startEditable: data.startEditable,
    durationEditable: data.durationEditable,
    resourceEditable: data.resourceEditable,
    resourceId: data.resourceId,
    resourceIds: data.resourceIds,

    display: data.display,
    restriction: data.restriction,
    className: data.className,
    color: data.color,
    backgroundColor: data.backgroundColor,
    borderColor: data.borderColor,
    textColor: data.textColor,
    extendedProps: data.extendedProps ? JSON.stringify(data.extendedProps) : null,

    state: data.state
  }

  return transformeddata
}

export const admin = () => {
          
  console.log('ADMIN')
}

export const validrange = nowDate => {
          
  return {
    start: nowDate
  }
}

export const fetchCampusEvents = (
  fetchInfo, 
  successCallback, 
  failureCallback
) => {

  apifetch('campus/calendar/events/get')
  .then(res => res.json())
  .then(events => successCallback(events))
  .catch(err => failureCallback(err));
}

export const onSelectCreateEvent = info => {

  const title = prompt('Título del evento');

  if (!title) {

    calendar.unselect();
    return;
  }

  apifetch(
    'campus/calendar/events/create', 
    {
      method: 'POST',
      body: {
        title: title,
        start: info.start.toISOString(),
        end: info.end ? info.end.toISOString() : null,
        allDay: info.allDay
      }
    }
  )
  .then(() => {
    
    calendar.refetchEvents();
  });

  calendar.unselect();
}

export const onEventUpdate = info => {

  apifetch(
    'campus/calendar/events/update',
    {
      method: 'POST',
      body: {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start.toISOString(),
        end: info.event.end ? info.event.end.toISOString() : null,
        allDay: info.event.allDay
      }
    }
  )
  .catch(() => {

    alert('Error al actualizar');
    info.revert();
  });
}

export const onEventDelete = info => {

  // if (!confirm('¿Eliminar este evento?')) return;

  apifetch(
    'campus/calendar/events/delete', 
    {
      method: 'POST',
      body: {
        id: info.event.id
      }
    }
  )
  .then(() => {

    calendar.refetchEvents();
  });
}