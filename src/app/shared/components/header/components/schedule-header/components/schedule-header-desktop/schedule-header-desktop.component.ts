import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-schedule-header-desktop',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './schedule-header-desktop.component.html',
  styleUrls: ['./schedule-header-desktop.component.scss'],
})
export class ScheduleHeaderDesktopComponent {
  @Output() action = new EventEmitter<string>();

  /**
   * Emite evento de clique com ação selecionada
   * @param action nome da ação
   */
  public change(action: string) {
    this.action.emit(action);
  }
}
