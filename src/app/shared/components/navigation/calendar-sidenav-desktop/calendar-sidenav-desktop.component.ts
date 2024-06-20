import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import {
  CalendarApi,
  CalendarOptions,
  DateSelectArg,
} from '@fullcalendar/core';
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
  styleUrls: ['./calendar-sidenav-desktop.component.scss'],
})
export class CalendarSidenavDesktopComponent implements AfterViewInit {
  @ViewChild('calendar') calendar!: FullCalendarComponent;

  @Output() public changeUser = new EventEmitter();
  @Output() public changeDate = new EventEmitter();

  @Input() public actionIcon = '';

  private _date!: { startStr: Date; endStr: Date };

  @Input()
  set date(value: { startStr: Date; endStr: Date }) {
    this._date = value;

    this.calendarOptions.events = [
      {
        start: value.startStr.toISOString().split('T')[0],
        end: value.endStr.toISOString().split('T')[0],
        display: 'background',
        backgroundColor: '#fdff0052',
      },
    ];

    if (this.calendarApi && value.endStr) {
      const newDate = value.startStr.setDate(value.startStr.getDate() + 15);

      const date = new Date(newDate);

      if (this.actionIcon !== 'dayGridMonth') {
        this.calendarApi.gotoDate(value.endStr.toISOString().split('T')[0]);
      } else {
        this.calendarApi.gotoDate(date.toISOString().split('T')[0]);
      }
      this.month =
        this.monthNamesPT[+date.toISOString().split('T')[0].split('-')[1] - 1];
    }
  }

  get startDate(): { startStr: Date; endStr: Date } {
    return this._date;
  }

  monthNamesPT = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  month = this.monthNamesPT[new Date().getMonth()];

  calendarApi!: CalendarApi;

  calendarOptions: CalendarOptions = {
    ...calendarSelectedOptions,
    initialView: 'dayGridMonth',
    select: this.handleSelect.bind(this),
  };

  allChecked = true;
  employeeList = this.employeeService.$employee.pipe(
    map((employees) =>
      employees.map((employee) => ({ ...employee, checked: true })),
    ),
  ) as Observable<any>;

  employeeListFormated = signal([{ id: 0 }]);

  constructor(private employeeService: EmployeeService) {
    this.employeeList.forEach((e) => {
      this.employeeListFormated.set(e);
      // console.log(e)
    });
  }
  ngAfterViewInit(): void {
    this.calendarApi = this.calendar.getApi();
  }

  emitSelectedEmployeeList(event: any): void {
    this.changeUser.emit(event);
  }

  change(event: string) {
    if (event === 'prev') {
      this.calendarApi.prev();
    }
    if (event === 'next') {
      this.calendarApi.next();
    }
    this.month = this.monthNamesPT[this.calendarApi.getDate().getMonth()];
  }

  toggleAll(event: any) {
    const checked = event.checked;
    this.allChecked = checked;

    const formatedObject = this.employeeListFormated().map((employee: any) => ({
      ...employee,
      checked,
    }));

    this.employeeList.forEach((elements: any) => {
      this.employeeList = of(
        elements.map((employee: any) => ({ ...employee, checked })),
      );
    });

    this.employeeListFormated.set(formatedObject);

    this.emitSelectedEmployeeList(formatedObject);
  }

  checkAllSelected(newObject: any) {
    const oldObjectIndex = this.employeeListFormated().findIndex(
      (element) => element.id === newObject.id,
    );

    const formatedObject = this.employeeListFormated();

    formatedObject[oldObjectIndex] = newObject;

    this.employeeListFormated.set(formatedObject);

    console.log(formatedObject);

    this.emitSelectedEmployeeList(formatedObject);
  }

  handleSelect(arg: DateSelectArg) {
    if (this.actionIcon === 'listWeek') {
      this.updateHighlight(arg.startStr);
      const { start, saturday } = this.getWeekRange(new Date(arg.startStr));

      this.calendar.getApi().unselect();

      this.changeDate.emit({ startStr: start, endStr: saturday });
    } else {
      this.calendarOptions.events = [
        {
          start: arg.startStr,
          end: arg.endStr,
          display: 'background',
          backgroundColor: '#fdff0052',
        },
      ];
      this.changeDate.emit(arg);
    }
  }

  updateHighlight(startDate: string) {
    const { sunday, saturday } = this.getWeekRange(new Date(startDate));

    this.calendarOptions.events = [
      {
        start: sunday.toISOString().split('T')[0],
        end: saturday.toISOString().split('T')[0],
        display: 'background',
        backgroundColor: '#fdff0052',
      },
    ];
  }

  getWeekRange(date: Date): { sunday: Date; saturday: Date; start: Date } {
    const day = date.getDay();
    const sunday = new Date(date);
    const start = new Date(date);
    const saturday = new Date(date);

    sunday.setDate(date.getDate() - (day + 1));
    start.setDate(date.getDate() - day);
    saturday.setDate(date.getDate() + (6 - day));

    return { start, sunday, saturday };
  }
}
