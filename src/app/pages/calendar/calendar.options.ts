import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

export const calendarSelectedOptions: CalendarOptions = {
  headerToolbar: {
    left: '',
    center: '',
    right: '',
  },
  noEventsText: 'Nenhum agendamento cadastrado',
  allDaySlot: false,
  titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
  plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin],
  slotMinTime: '05:00:00',
  slotMaxTime: '22:00:00',
  initialView: 'timeGrid',
  visibleRange: function(currentDate) {
     let startDate = new Date(currentDate.valueOf());
     startDate.setDate(startDate.getDate() - startDate.getDay());
     
     let endDate = new Date(currentDate.valueOf());
     endDate.setDate(startDate.getDate() + 6);
 
     return { start: startDate, end: endDate };
  },
  initialEvents: [],
  weekends: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  selectLongPressDelay: 250,
  locale: 'pt-br',
  nowIndicator: true,
};
