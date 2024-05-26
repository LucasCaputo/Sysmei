export const CalendarViewOptions: any = [
  {
    calendarView: 'dayGridMonth',
    redirectTo: 'timeGridDay',
    icon: 'calendar_month',
  },
  {
    calendarView: 'timeGridDay',
    redirectTo: 'timeGridWeek',
    icon: 'today',
  },
  {
    calendarView: 'timeGridWeek',
    redirectTo: 'listWeek',
    icon: 'date_range',
  },
  {
    calendarView: 'listWeek',
    redirectTo: 'dayGridMonth',
    icon: 'event_note',
  },
];
