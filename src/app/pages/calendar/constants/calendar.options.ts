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
  slotMaxTime: '23:00:00',
  initialView: 'timeGridWeek',
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
