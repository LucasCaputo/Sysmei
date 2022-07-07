import { CalendarOptions } from "@fullcalendar/core";

export const calendarSelectedOptions: CalendarOptions = {
    headerToolbar: {
      left: '',
      center: '',
      right: '',
    },
    allDaySlot: false,
    titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
    initialView: 'timeGridWeek',
    initialEvents: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    selectLongPressDelay: 250,
    locale: 'pt-br',
  };
