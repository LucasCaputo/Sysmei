export const CalendarViewOptions: any = [
  {
    calendarView: 'dayGridMonth',
    redirectTo: 'timeGridDay',
    icon: 'calendar_month',
    label: 'Mês',
  },
  {
    calendarView: 'timeGridDay',
    redirectTo: 'timeGridWeek',
    icon: 'today',
    label: 'Dia',
  },
  {
    calendarView: 'timeGridWeek',
    redirectTo: 'listWeek',
    icon: 'date_range',
    label: 'Semana',
  },
  {
    calendarView: 'listWeek',
    redirectTo: 'dayGridMonth',
    icon: 'event_note',
    label: 'Lista',
  },
];
