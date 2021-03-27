import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { SchedulingFormComponent } from './scheduling-form/scheduling-form.component';

@Component({
  selector: 'app-schedule-home',
  templateUrl: './schedule-home.component.html',
  styleUrls: ['./schedule-home.component.scss']
})
export class ScheduleHomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {

  }
  
  ngOnInit(): void {
  }
  
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
    },
    buttonText:
    {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      list: 'Agendamentos'
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
    locale: 'pt-br'
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
      data: selectInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });


    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    calendarApi.addEvent({
      id: createEventId(),
      title: 'Dialog test',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    });
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
