import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarViewOptions } from '../../../contants/calendar.navigation.options';

@Component({
  selector: 'app-calendar-navigation-desktop',
  standalone: true,
  imports: [SharedModule, MatCardModule],
  templateUrl: './calendar-navigation-desktop.component.html',
  styleUrls: ['./calendar-navigation-desktop.component.scss']
})
export class CalendarNavigationDesktopComponent {
  @Output() action = new EventEmitter<string>();
  @Output() addNewSchedule = new EventEmitter();

  @Input() actionIcon = ''

  calendarViewOptions = CalendarViewOptions;

  /**
 * Emite evento de clique com ação selecionada
 * @param action nome da ação
 */
  public change(action: string) {
    this.action.emit(action);
  }

  /**
* Emite evento de clique com ação selecionada
*/
  public onAddNewSchedule() {
    this.addNewSchedule.emit()
  }
}
