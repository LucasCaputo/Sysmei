import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { SchedulingFormComponent } from '../scheduling-form/scheduling-form.component';
import { ScheduleService } from '../../schedule.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private router: Router
  ) {
    this.Name();
  }

  ngOnInit(): void {}

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
    initialEvents: INITIAL_EVENTS,
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

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: selectInfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let start = result.data.startStr
          .replace(/.{9}$/gm, '')
          .replace(/T/gm, ' ');
        let end = result.data.endStr.replace(/.{9}$/gm, '').replace(/T/gm, ' ');
        const schedule = {
          title: result.title,
          start,
          end,
          status: true,
          usuario: {
            login: this.auth.getUser()?.login,
          },
          paciente: {
            id: result.customer,
          },
        };

        /*     this.scheduleService.postScheduling(schedule).subscribe((response) => {
          console.log(response);
        });
 */
        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        calendarApi.addEvent({
          id: createEventId(),
          title: result.title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
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
