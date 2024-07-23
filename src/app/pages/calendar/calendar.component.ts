import { AfterViewInit, Component, ViewChild, signal } from '@angular/core';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventDropArg,
  EventInput,
  ViewApi,
} from '@fullcalendar/core';
import { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AgendaStatusComponent } from 'src/app/shared/components/dialogs/agenda-status/agenda-status.component';
import { UserDialogComponent } from 'src/app/shared/components/dialogs/user-dialog/user-dialog.component';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { CalendarNaviagtionComponent } from 'src/app/shared/components/navigation/calendar-naviagtion/calendar-naviagtion.component';
import { CalendarNavigationDesktopComponent } from 'src/app/shared/components/navigation/calendar-navigation-desktop/calendar-navigation-desktop.component';
import { CalendarSidenavDesktopComponent } from 'src/app/shared/components/navigation/calendar-sidenav-desktop/calendar-sidenav-desktop.component';
import { ScheduleFormatResponse } from 'src/app/shared/interfaces/schedule-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { CardColor } from 'src/app/shared/services/utils/schedule-card-color';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ViewportService } from 'src/app/shared/services/viewport.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulingFormComponent } from '../../shared/components/dialogs/scheduling-form/scheduling-form.component';
import { ScheduleHeaderComponent } from '../../shared/components/header/components/schedule-header/schedule-header.component';
import { calendarSelectedOptions } from './calendar.options';

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
    SchedulingFormComponent,
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
    eventsSet: this.handleEvents.bind(this),
    dateClick: this.redirectMonthToDay.bind(this),
  };

  calendarEvents: Observable<EventInput> =
    this.customerService.searchCustomer$.pipe(
      switchMap(() =>
        this.scheduleService.searchSchedule$.pipe(
          map((elements: ScheduleFormatResponse[]) =>
            elements.map((element: ScheduleFormatResponse) => ({
              ...element,
              color: this.cardColor(element.status),
            })),
          ),
          tap((scheduleFormat) => (this.scheduling = scheduleFormat)),
        ),
      ),
    );

  user = this.auth.getUser();
  currentEvents: EventApi[] = [];
  scheduling: EventInput[] = [];
  viewApi!: ViewApi;
  calendarDateTitle = signal('...');
  actionIcon = signal('timeGridWeek');

  calendarState = {
    calendarDateTitle: signal('...'),
    activetedIcon: signal('timeGridWeek'),
    date: signal({
      startStr: new Date(),
      endStr: new Date(),
    }),
  };
  todayIcon = 'primary';
  timeElapsed = Date.now();
  calendarApi: any;

  screenSize$ = this.viewportService.screenSize$;

  constructor(
    private dialog: MatDialog,
    private scheduleService: ScheduleService,
    private customerService: CustomerService,
    private auth: AuthService,
    private router: Router,
    private utilsService: UtilsService,
    public loaderService: LoaderService,
    public viewportService: ViewportService,
  ) {}

  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();

    setTimeout(() => {
      this.calendarNavigate();
    }, 0);
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

    const dialogRef = this.dialog.open(SchedulingFormComponent, {
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

      this.calendarApi.view.calendar.addEvent(
        this.formatScheduleToCalendar(result),
      );
    });
  }

  /** Edita um agendamento */
  private editSchedule(clickInfo: EventClickArg) {
    const dialogRef = this.dialog.open(AgendaStatusComponent, {
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

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
    });
  }

  /** Formata retorno do dialog para inserir no calendário */
  private formatScheduleToCalendar(result: any) {
    let resultFormat = this.scheduleService.formatRequestPayload(result);

    resultFormat = this.scheduleService.formatScheduleResponse([
      { ...resultFormat, id: 'tempID' },
    ]);

    return resultFormat[0];
  }

  /** Redireciona para dia selecionado quando em calendário tipo Mês */
  private redirectMonthToDay(clickInfo: DateClickArg) {
    if (this.calendarApi?.view?.type === 'dayGridMonth') {
      this.calendarApi.changeView('timeGridDay');
      this.calendarApi.view.calendar.gotoDate(clickInfo.date);
      this.calendarDateTitle.set(this.calendarApi?.view?.title);
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

    this.calendarState.date.set({
      startStr: this.calendarApi.view.activeStart,
      endStr: this.calendarApi.view.activeEnd,
    });

    this.getSchedule(this.calendarApi.view.activeStart);

    if (this.calendarApi?.view?.title) {
      this.calendarDateTitle.set(this.calendarApi?.view?.title);
    }

    this.setColorIconToday();
  }

  private getSchedule(date: Date): void {
    this.scheduleService.reloadSchedule(date);
  }

  private setColorIconToday() {
    const today = new Date(this.timeElapsed);

    if (
      this.calendarApi?.view &&
      this.calendarApi.view.activeStart < today &&
      this.calendarApi.view.activeEnd > today
    ) {
      this.todayIcon = 'primary';
    } else {
      this.todayIcon = 'secondary';
    }
  }

  private handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  public changeEmployee(event: any): void {
    const selectedEmployee = event
      .filter((element: any) => element.checked)
      .map((element: any) => element.id) as number[];
    const filteredSchedule = this.scheduling.filter((element) =>
      selectedEmployee.includes(element.employee.id),
    );
    this.calendarApi.removeAllEvents();

    filteredSchedule.forEach((element: any) => {
      this.calendarApi.view.calendar.addEvent({
        ...element,
        color: this.cardColor(element.status),
      });
    });
  }

  public cardColor(status: number | undefined): string {
    return CardColor(status);
  }

  public changeDate(event: any): void {
    this.calendarApi.gotoDate(event.startStr);

    this.calendarApi.changeView('timeGrid');

    this.calendarApi.setOption('visibleRange', {
      start: event.startStr,
      end: event.endStr,
    });

    if (this.calendarApi?.view?.title) {
      this.calendarDateTitle.set(this.calendarApi?.view?.title);
    }

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

  public openUserSettingsModal(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      position: {
        top: '90px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
    });
  }
}
