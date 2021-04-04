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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
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

    // debugger

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const schedule = {
          title: result.title,
          start: result.data.startStr,// 2021-04-04T08:00:00-03:00 string
          end: result.data.endStr, //2021-04-04T08:30:00-03:00 string
          allDay: '2021-01-31', 
          status: true,
          usuario: {
                    "login": this.auth.getUser()?.login
                 },
          paciente: {
            id: result.customer
          }
        };

        debugger;

      //   {
      //     "title": "Teste",
      //     "start": "2021-04-30 05:10",
      //     "end": "2021-04-30 06:10",
      //     "allDay": "2021-02-31",
      //     "status": true,
      //     "usuario": {
      //         "login": "zezin"
      //     },
      //     "paciente": {
      //         "id": "5"
      //     }
      // }

        // this.scheduleService
        //   .postScheduling(schedule)
        //   .subscribe((response) => {
        //     console.log(response);
        //   });

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
}
