import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarViewOptions } from './calendar.navigation.options';

@Component({
  selector: 'app-calendar-naviagtion',
  templateUrl: './calendar-naviagtion.component.html',
  styleUrls: ['./calendar-naviagtion.component.scss'],
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

  /**
   * Verifica o movimento do usuário para esquerda ou direita e emite evento
   * @param event dados do evento de arrastar
   */
  public onSwipe(event: any) {
    const x =
      Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? 'Right' : 'Left') : '';

    if (x === 'Right') {
      this.change('next');
    } else if (x === 'Left') {
      this.change('prev');
    }
  }
}
