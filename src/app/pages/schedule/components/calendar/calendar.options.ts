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
  slotMinTime: '05:00:00',
  slotMaxTime: '22:00:00',
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
