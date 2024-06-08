import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
  @Output() public changeUser = new EventEmitter();
  @Output() public changeDate = new EventEmitter();

  calendarOptions: CalendarOptions = {
    ...calendarSelectedOptions,
    initialView: 'dayGridMonth',
    select: this.handleSelect.bind(this),
  }

  allChecked = true;
  employeeList = this.employeeService.$employee.pipe(
    map((employees) => employees.map(employee => ({ ...employee, checked: true }))),
  ) as Observable<any>

  employeeListFormated = signal([{ id: 0 }])

  constructor(private employeeService: EmployeeService) {
    this.employeeList.forEach((e) => {
      this.employeeListFormated.set(e);
      // console.log(e)
    })
  }

  emitSelectedEmployeeList(event: any): void {
    this.changeUser.emit(event)
  }

  toggleAll(event: any) {
    const checked = event.checked
    this.allChecked = checked;

    const formatedObject = this.employeeListFormated().map((employee: any) => ({ ...employee, checked }))

    this.employeeList.forEach((elements: any) => {
      this.employeeList = of(elements.map((employee: any) => ({ ...employee, checked })))
    });

    this.employeeListFormated.set(formatedObject)

    this.emitSelectedEmployeeList(formatedObject);
  }

  checkAllSelected(newObject: any) {

    const oldObjectIndex = this.employeeListFormated().findIndex((element) => element.id === newObject.id)

    const formatedObject = this.employeeListFormated();

    formatedObject[oldObjectIndex] = newObject;

    this.employeeListFormated.set(formatedObject)

    console.log(formatedObject)

    this.emitSelectedEmployeeList(formatedObject);
  }


  handleSelect(arg: DateSelectArg) {
    // console.log(arg);
    this.changeDate.emit(arg)
  }
}
