import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { SchedulingFormComponent } from '../scheduling-form/scheduling-form.component';
import { ScheduleService } from '../../schedule.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  user = this.auth.getUser();

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      list: 'Lista',
    },
    allDaySlot: false,
    titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
    initialView: 'timeGridWeek',
    initialEvents: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    selectLongPressDelay: 100,
    locale: 'pt-br',
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  scheduling: EventInput[] = [];
  loading = false;

  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private router: Router,
    private utilsService: UtilsService,
    private localStorageService: LocalStorageService
  ) {
    this.Name();
  }

  ngOnInit(): void {
    this.getScheduling();
  }

  getScheduling() {
    this.loading = true;
    // const hasLocalStorage = this.localStorageService.getCustomer();
    // if (hasLocalStorage && !isChangeDatabese) {
    // this.formatContacts(hasLocalStorage);
    // } else {

    this.scheduleService.getScheduling(this.user).subscribe(
      (response) => {
        response.forEach((element: any) => {
          this.scheduling.push({
            id: element.id.toString(),
            title: element.title,
            start: this.utilsService.formatStringData(element.start),
            end: this.utilsService.formatStringData(element.end),
          });
        });

        return this.scheduling;
      },
      (error) => {
        alert('Seu token venceu, faça login novamente');
        this.auth.logout();
        this.router.navigate(['login']);
      },
      () => {
        this.loading = false;
      }
    );

    this.calendarOptions.initialEvents = this.scheduling;

    // }
  }

  formatContacts(response: any) {
    let scheduling:
      | EventInput[]
      | { id: any; title: any; start: string; end: string }[] = [];

    response.forEach(
      (element: { id: any; title: any; start: string; end: string }) => {
        scheduling.push({
          id: element.id,
          title: element.title,
          start: this.utilsService.formatStringData(element.start),
          end: this.utilsService.formatStringData(element.end),
        });
      }
    );

    console.log(scheduling, 'formatado');

    const initialEvents: EventInput[] = scheduling;

    return initialEvents;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: selectInfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let start = this.utilsService.clearStringData(result.data.startStr);
        let end = this.utilsService.clearStringData(result.data.endStr);

        const schedule = {
          title: result.title,
          start,
          end,
          status: true,
          login_usuario: this.auth.getUser()?.login,
          paciente_id: result.customer,
        };

        this.scheduleService.postScheduling(schedule).subscribe((response) => {
          console.log(response);
        });

        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        calendarApi.addEvent({
          id: createEventId(),
          title: result.title,
          start: this.utilsService.formatStringData(start),
          end: this.utilsService.formatStringData(end),
          allDay: selectInfo.allDay,
          extendedProps: {
            description: result.description,
          },
        });
      }
    });
  }

  Name() {
    const user = this.auth.getUser();
    return user?.nome;
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Deseja excluir o evento?' ${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
