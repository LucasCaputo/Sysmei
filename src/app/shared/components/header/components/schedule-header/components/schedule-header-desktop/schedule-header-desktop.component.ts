import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-schedule-header-desktop',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './schedule-header-desktop.component.html',
  styleUrls: ['./schedule-header-desktop.component.scss']
})
export class ScheduleHeaderDesktopComponent {

}
