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
import { SchedulingService } from '../../scheduling.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private schedulingService: SchedulingService,
    private auth: AuthService
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
      list: 'Agendamentos',
    },
    titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
    initialView: 'timeGridDay',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
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
      data: selectInfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const schedule = {
          title: result.title,
          start: result.data.startStr,
          end: result.data.endStr,
          allDay: '2021-01-31',
        };

        debugger;

        this.schedulingService
          .postScheduling(schedule)
          .subscribe((response) => {
            console.log(response);
          });

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
    console.log(user);
    return user;
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Deseja excluir o evento?' ${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
