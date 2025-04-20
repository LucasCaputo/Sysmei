import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ViewportService } from 'src/app/shared/services/viewport.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleHeaderDesktopComponent } from './components/schedule-header-desktop/schedule-header-desktop.component';

@Component({
  selector: 'app-schedule-header',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, HeaderComponent, ScheduleHeaderDesktopComponent],
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss'],
})
export class ScheduleHeaderComponent {
  @Output() private addButtonClick = new EventEmitter();
  @Output() private menuButtonClick = new EventEmitter();
  @Output() private navigateButtonClick = new EventEmitter<string>();

  @Input({ required: true }) public calendarDateTitle!: string;

  screenSize$ = this.viewportService.screenSize$;

  constructor(private viewportService: ViewportService) {}

  public onAddButtonClick() {
    this.addButtonClick.emit();
  }

  public onMenuButtonClick() {
    this.menuButtonClick.emit();
  }

  public onNavigateButtonClick(event: string) {
    this.navigateButtonClick.emit(event);
  }
}
