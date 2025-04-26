export interface CalendarDateRange {
  startStr: Date;
  endStr: Date;
}

export interface CalendarState {
  calendarDateTitle: string;
  activetedIcon: string;
  date: CalendarDateRange;
}
