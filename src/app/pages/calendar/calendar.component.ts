import { AfterViewInit, Component, ViewChild, signal } from '@angular/core';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventDropArg, EventInput, ViewApi } from '@fullcalendar/core';
import { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { AgendaStatusComponent } from 'src/app/shared/components/dialogs/agenda-status/agenda-status.component';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { CalendarNaviagtionComponent } from 'src/app/shared/components/navigation/calendar-naviagtion/calendar-naviagtion.component';
import { CalendarNavigationDesktopComponent } from 'src/app/shared/components/navigation/calendar-navigation-desktop/calendar-navigation-desktop.component';
import { CalendarSidenavDesktopComponent } from 'src/app/shared/components/navigation/calendar-sidenav-desktop/calendar-sidenav-desktop.component';
import { EmployeeList } from 'src/app/shared/interfaces/employee-list';
import { ScheduleFormatResponse } from 'src/app/shared/interfaces/schedule-response';
import { CalendarStateService } from 'src/app/shared/services/calendar/calendar-state.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { CardColor } from 'src/app/shared/services/utils/schedule-card-color';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ViewportService } from 'src/app/shared/services/viewport.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulingDialogComponent } from '../../shared/components/dialogs/scheduling-dialog/scheduling-dialog.component';
import { ScheduleHeaderComponent } from '../../shared/components/header/components/schedule-header/schedule-header.component';
import { calendarSelectedOptions } from './constants/calendar.options';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [
    FullCalendarModule,
    ScheduleHeaderComponent,
    MatSidenavModule,
    MenuComponent,
    CalendarNaviagtionComponent,
    SharedModule,
    CalendarNavigationDesktopComponent,
    CalendarSidenavDesktopComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    ...calendarSelectedOptions,
    select: this.insertSchedule.bind(this),
    eventClick: this.editSchedule.bind(this),
    eventDrop: this.onDragAndDrop.bind(this),
    eventResize: this.onDragAndDrop.bind(this),
    dateClick: this.redirectMonthToDay.bind(this),
  };

  calendarEvents: Observable<EventInput> = this.customerService.searchCustomer$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.scheduleService.searchSchedule$.pipe(
        map((elements: ScheduleFormatResponse[]) =>
          elements.map((element: ScheduleFormatResponse) => ({
            ...element,
            color: this.cardColor(element.status),
          })),
        ),
        tap((scheduleFormat) => (this.scheduling = scheduleFormat)),
        map((scheduleFormat) => {
          if (!this.employeeList) {
            return scheduleFormat;
          }
          const selectedEmployeeIds = this.employeeList.filter((element: any) => element.checked).map((element: any) => element.id);

          return scheduleFormat.filter((e) => selectedEmployeeIds.includes(e.employee?.id));
        }),
      ),
    ),
  );

  scheduling: EventInput[] = [];
  viewApi!: ViewApi;
  calendarDateTitle = this.calendarStateService.calendarDateTitle;
  actionIcon = signal('timeGridWeek');

  calendarState = this.calendarStateService.calendarState;
  calendarApi: any;
  employeeList: EmployeeList[] | undefined;

  constructor(
    private dialog: MatDialog,
    private scheduleService: ScheduleService,
    private customerService: CustomerService,
    private router: Router,
    private utilsService: UtilsService,
    public loaderService: LoaderService,
    public viewportService: ViewportService,
    private calendarStateService: CalendarStateService,
  ) {}

  public ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();

    this.calendarNavigate();
  }

  /** Atualiza agendamento por drag and drop
   * @Input data: EventDropArg | EventResizeDoneArg
   * */
  private onDragAndDrop(data: EventDropArg | EventResizeDoneArg) {
    let start = this.utilsService.clearStringData(data.event.startStr);
    let end = this.utilsService.clearStringData(data.event.endStr);

    const schedule = {
      id: parseInt(data.event?._def?.publicId),
      start,
      end,
      paciente_id: data.event._def?.extendedProps?.customer.id,
      prestador_id: data.event._def?.extendedProps?.employee.id,
      status: data.event._def?.extendedProps?.status,
    };

    this.scheduleService.updateScheduling(schedule, schedule.id).subscribe();
  }

  /** Adiciona um novo agendamento*/
  public insertSchedule(selectInfo?: DateSelectArg) {
    if (!this.customerService?.customers?.length) {
      alert('você precisa cadastrar seu primeiro cliente');

      this.router.navigate(['/clientes']);
      return;
    }

    let dateClick = null;

    if (selectInfo) {
      const { start, end } = selectInfo;
      dateClick = { start, end };
    }

    const dialogRef = this.dialog.open(SchedulingDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { ...dateClick, hasDelete: false },
      position: {
        top: '90px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.calendarApi.view.calendar.unselect();

      this.calendarApi.view.calendar.addEvent(this.formatScheduleToCalendar(result));
    });
  }

  /** Edita um agendamento */
  private editSchedule(clickInfo: EventClickArg) {
    this.dialog.open(AgendaStatusComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: {
        ...clickInfo?.event?._def?.extendedProps,
        start: clickInfo?.event?.start,
        end: clickInfo?.event?.end,
      },
      position: {
        top: '90px',
      },
    });
  }

  /** Formata retorno do dialog para inserir no calendário */
  private formatScheduleToCalendar(result: any) {
    let resultFormat = this.scheduleService.formatRequestPayload(result);

    resultFormat = this.scheduleService.formatScheduleResponse([{ ...resultFormat, id: 'tempID' }]);

    return resultFormat[0];
  }

  /** Redireciona para dia selecionado quando em calendário tipo Mês */
  private redirectMonthToDay(clickInfo: DateClickArg) {
    if (this.calendarApi?.view?.type === 'dayGridMonth') {
      this.calendarApi.changeView('timeGridDay');
      this.calendarApi.view.calendar.gotoDate(clickInfo.date);
      this.setCalendarDateTitle();
    }
  }

  /**Executa ação de navegação no calendário
   * @param action nome da ação seleciona
   */
  public calendarNavigate(action?: string) {
    this.calendarApi.setOption('visibleRange', {
      start: null,
      end: null,
    });

    if (this.actionIcon() === 'timeGridWeek') {
      this.calendarApi.changeView('timeGridWeek');
    }

    if (action) {
      switch (action) {
        case 'next':
          this.calendarApi.next();
          break;

        case 'prev':
          this.calendarApi.prev();
          break;

        case 'today':
          this.calendarApi.today();
          break;

        default:
          this.actionIcon.set(action);
          this.calendarApi.changeView(action);
          break;
      }
    }
    this.calendarStateService.setCalendarState({
      date: {
        startStr: this.calendarApi.view.activeStart,
        endStr: this.calendarApi.view.activeEnd,
      },
    });

    this.scheduleService.reloadSchedule();

    this.setCalendarDateTitle();
  }

  public changeEmployee(employeeList: EmployeeList[] | undefined = this.employeeList): void {
    if (employeeList) {
      this.employeeList = employeeList;
      const selectedEmployee = employeeList.filter((element: any) => element.checked).map((element: any) => element.id) as number[];
      const filteredSchedule = this.scheduling.filter((element) => selectedEmployee.includes(element.employee.id));
      this.calendarApi.removeAllEvents();

      filteredSchedule.forEach((element: any) => {
        this.calendarApi.view.calendar.addEvent({
          ...element,
          color: this.cardColor(element.status),
        });
      });
    }
  }

  public cardColor(status: number | undefined): string {
    return CardColor(status);
  }

  private setCalendarDateTitle(): void {
    if (this.calendarApi?.view?.title) {
      this.calendarStateService.calendarDateTitle.set(this.calendarApi?.view?.title);
    }
  }

  public changeDate(event: any): void {
    this.calendarApi.gotoDate(event.startStr);

    this.calendarApi.changeView('timeGrid');

    this.calendarApi.setOption('visibleRange', {
      start: event.startStr,
      end: event.endStr,
    });

    this.setCalendarDateTitle();

    if (this.actionIcon() === 'listWeek') {
      // listDay , listWeek , listMonth
      this.calendarApi.changeView('listWeek');
      this.actionIcon.set('listWeek');

      return;
    }

    this.actionIcon.set('timeGridDay');

    if (this.calendarApi?.view?.title.split('').includes('–')) {
      this.actionIcon.set('timeGridWeek');
    }
  }
}
