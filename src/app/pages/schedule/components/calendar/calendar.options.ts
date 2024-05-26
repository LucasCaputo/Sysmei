import { CalendarOptions } from '@fullcalendar/core';
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
  plugins: [timeGridPlugin],
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
