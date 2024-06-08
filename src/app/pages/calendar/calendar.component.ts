import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
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
import { ScheduleFormatResponse } from 'src/app/repository/intefaces/schedule-response';
import { AgendaStatusComponent } from 'src/app/shared/components/dialogs/agenda-status/agenda-status.component';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { CalendarNaviagtionComponent } from 'src/app/shared/components/navigation/calendar-naviagtion/calendar-naviagtion.component';
import { CalendarNavigationDesktopComponent } from 'src/app/shared/components/navigation/calendar-navigation-desktop/calendar-navigation-desktop.component';
import { CalendarSidenavDesktopComponent } from 'src/app/shared/components/navigation/calendar-sidenav-desktop/calendar-sidenav-desktop.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulingFormComponent } from '../../shared/components/dialogs/scheduling-form/scheduling-form.component';
import { ScheduleHeaderComponent } from '../../shared/components/header/components/schedule-header/schedule-header.component';
import { calendarSelectedOptions } from './calendar.options';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [FullCalendarModule,
    ScheduleHeaderComponent, MatSidenavModule, MenuComponent,
    CalendarNaviagtionComponent, SchedulingFormComponent, SharedModule,
    CalendarNavigationDesktopComponent, CalendarSidenavDesktopComponent
  ]
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

  user = this.auth.getUser();
  currentEvents: EventApi[] = [];
  scheduling: EventInput[] = [];
  viewApi!: ViewApi;
  calendarDateTitle = '...';
  todayIcon = 'primary';
  timeElapsed = Date.now();
  calendarApi: any;

  constructor(
    private dialog: MatDialog,
    private scheduleService: ScheduleService,
    private customerService: CustomerService,
    private auth: AuthService,
    private router: Router,
    private utilsService: UtilsService,
    private snackbarService: SnackbarService,
    public loaderService: LoaderService
  ) { }

  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();
    this.populateSchedule();

    setTimeout(() => {
      this.calendarNavigate();
    }, 0);
  }

  /** Recebe os dados de todos os agendamentos e popula a lista */
  private populateSchedule() {
    this.scheduleService.$formatedSchedule.subscribe(
      (scheduleFormatResponse: Array<ScheduleFormatResponse>) => {
        if (scheduleFormatResponse.length) {
          this.calendarApi.removeAllEvents();

          scheduleFormatResponse.forEach((element: ScheduleFormatResponse) => {
            this.scheduling.push({ ...element, color: 'purple' });
            this.calendarApi.view.calendar.addEvent({ ...element, color: this.cardColor(element.status) });
          });
        }
      },
    );
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
      status: data.event._def?.extendedProps?.status
    };

    this.scheduleService.updateScheduling(schedule, schedule.id).subscribe(
      (result) => {
        this.scheduleService.searchScheduleList();
        this.snackbarService.openSnackBar(
          `Agendamento atualizado com sucesso`,
          'X',
          false,
        );
      },
      (error) => {
        console.log(error, 'update');
        this.snackbarService.openSnackBar(
          `Tivemos um erro para atualizar, tente novamente`,
          'X',
          true,
        );
      },
    );
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
      maxWidth: '100vw',
      data: { ...dateClick, hasDelete: false },
      position: {
        top: '70px'
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
      maxWidth: '100vw',
      data: {
        ...clickInfo?.event?._def?.extendedProps,
        start: clickInfo?.event?.start,
        end: clickInfo?.event?.end,
      },
      position: {
        top: '70px'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      // clickInfo.event.remove();

      // this.calendarApi.view.calendar.addEvent(
      //   this.formatScheduleToCalendar(result),
      // );
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
      this.calendarDateTitle = this.calendarApi?.view?.title;
    }
  }

  /**Executa ação de navegação no calendário
   * @param action nome da ação seleciona
   */
  public calendarNavigate(action?: string) {
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
          this.calendarApi.changeView(action);
          break;
      }
    }

    if (this.calendarApi?.view?.title) {
      this.calendarDateTitle = this.calendarApi?.view?.title;
    }

    this.setColorIconToday();
  }

  /** Seta cor do ícone de dia atual
   * @param calendarApi
   */
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
    const selectedEmployee = event.filter((element: any) => element.checked).map((element: any) => element.id) as number[]
    const filteredSchedule = this.scheduling.filter((element) => selectedEmployee.includes(element.employee.id));
    this.calendarApi.removeAllEvents();

    filteredSchedule.forEach((element: any) => {
      this.calendarApi.view.calendar.addEvent({ ...element, color: this.cardColor(element.status) });
    });
  }

  public cardColor(status: number | undefined): string {
    let color = ''
    switch (status) {
      case 0:
        color = 'purple'
        break;

      case 1:
        color = 'green'
        break;


      case 2:
        color = 'burlywood'
        break;

      case 3:
        color = 'blue'
        break;

      case 4:
        color = 'gray'
        break;


      case 5:
        color = 'burlywood'
        break;

      default:
        break;
    }

    return color
  }

  public changeDate(event: any): void {
    this.calendarApi.gotoDate(event.startStr);

    this.calendarApi.changeView('timeGrid')

    this.calendarApi.setOption('visibleRange', {
      start: event.startStr,
      end: event.endStr
    });
  }
}


