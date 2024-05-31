import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { calendarSelectedOptions } from 'src/app/pages/calendar/calendar.options';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-calendar-sidenav-desktop',
  standalone: true,
  imports: [SharedModule, FullCalendarModule, MatCheckboxModule],
  templateUrl: './calendar-sidenav-desktop.component.html',
  styleUrls: ['./calendar-sidenav-desktop.component.scss']
})
export class CalendarSidenavDesktopComponent {
  calendarOptions: CalendarOptions = {
    ...calendarSelectedOptions,
    initialView: 'dayGridMonth',
  }

  customerList = this.employeeService.$employee

  constructor(private employeeService: EmployeeService) { }

}
