import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CalendarStateService } from 'src/app/shared/services/calendar/calendar-state.service';
import { CalendarViewOptions } from '../../../constants/calendar.navigation.options';

@Component({
  selector: 'app-calendar-naviagtion',
  templateUrl: './calendar-naviagtion.component.html',
  styleUrls: ['./calendar-naviagtion.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class CalendarNaviagtionComponent {
  @Input() title = '';
  @Output() action = new EventEmitter<string>();

  todayIcon = signal('primary');
  calendarViewOptions = CalendarViewOptions;
  direction = '';
  actionIcon = 'timeGridWeek';

  public constructor(private readonly calendarStateService: CalendarStateService) {}

  /**
   * Emite evento de clique com ação selecionada
   * @param action nome da ação
   */
  public change(action: string) {
    if (!(action === 'today' || action === 'next' || action === 'prev')) {
      this.actionIcon = action;
    }
    this.action.emit(action);
    this.setColorIconToday();
  }

  public setColorIconToday() {
    const today = new Date(Date.now());

    if (this.calendarStateService.date.startStr < today && this.calendarStateService.date.endStr > today) {
      this.todayIcon.set('primary');
    } else {
      this.todayIcon.set('secondary');
    }
  }
}
