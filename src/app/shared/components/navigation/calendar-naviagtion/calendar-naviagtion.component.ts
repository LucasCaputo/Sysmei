import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CalendarViewOptions } from '../../../contants/calendar.navigation.options';

@Component({
  selector: 'app-calendar-naviagtion',
  templateUrl: './calendar-naviagtion.component.html',
  styleUrls: ['./calendar-naviagtion.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class CalendarNaviagtionComponent {
  @Input() title = '';
  @Input() todayIcon = '';
  @Output() action = new EventEmitter<string>();

  calendarViewOptions = CalendarViewOptions;
  direction = '';
  actionIcon = 'timeGridWeek';

  /**
   * Emite evento de clique com ação selecionada
   * @param action nome da ação
   */
  public change(action: string) {
    if (!(action === 'today' || action === 'next' || action === 'prev')) {
      this.actionIcon = action;
    }
    this.action.emit(action);
  }
}
