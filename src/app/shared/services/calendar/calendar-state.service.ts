import { Injectable, signal } from '@angular/core';
import { CalendarState } from '../../interfaces/calendar-state';
import { getStartAndEndOfWeekDateFomat } from '../utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class CalendarStateService {
  private initialDate = getStartAndEndOfWeekDateFomat(new Date());
  public readonly calendarState = {
    calendarDateTitle: signal('...'),
    activetedIcon: signal('timeGridWeek'),
    date: signal({
      startStr: this.initialDate.startDate,
      endStr: this.initialDate.endDate,
    }),
  };

  public date = {
    startStr: this.initialDate.startDate,
    endStr: this.initialDate.endDate,
  };

  public setCalendarState({ calendarDateTitle, activetedIcon, date }: Partial<CalendarState>): void {
    if (calendarDateTitle) {
      this.calendarState.calendarDateTitle.set(calendarDateTitle);
    }

    if (activetedIcon) {
      this.calendarState.activetedIcon.set(activetedIcon);
    }

    if (date) {
      this.calendarState.date.set({
        startStr: new Date(date.startStr),
        endStr: new Date(date.endStr),
      });

      this.date = {
        startStr: date.startStr,
        endStr: date.endStr,
      };
    }
  }
}
