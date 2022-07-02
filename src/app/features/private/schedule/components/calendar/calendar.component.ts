import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventInput,
} from '@fullcalendar/angular';
import { SchedulingFormComponent } from '../scheduling-form/scheduling-form.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ScheduleDialogComponent } from '../../../shared/dialogs/schedule-dialog/schedule-dialog.component';
import { ScheduleRepository } from 'src/app/repository/services/schedule/schedule.repository';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { ScheduleResponse } from 'src/app/repository/intefaces/schedule-response';
import { CustomerService } from '../../../shared/services/customer/customer.service';

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
    select: this.onInsertScheduling.bind(this),
    eventClick: this.onEditScheduling.bind(this),
    eventDrop: this.onDragAndDrop.bind(this),
    eventResize: this.onDragAndDrop.bind(this),
    selectLongPressDelay: 250,
    locale: 'pt-br',
  };

  scheduling: EventInput[] = [];
  loading = false;

  constructor(
    public dialog: MatDialog,
    private scheduleRepository: ScheduleRepository,
    private scheduleService: ScheduleService,
    private customerService: CustomerService,
    private auth: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.scheduleService.$schedule.subscribe(
      (scheduleResponse: Array<ScheduleResponse>) => {
        if (scheduleResponse.length) {
          scheduleResponse.forEach((element: ScheduleResponse) => {
            this.scheduling.push({
              id: element.id.toString(),
              title: element.title,
              start: this.utilsService.formatStringData(element.start),
              end: this.utilsService.formatStringData(element.end),
              customer: element.paciente_id,
              valor: element.valor,
              pagamento: element.pagamento,
              detalhes: element.detalhes,
            });
          });

        }
        this.calendarOptions.initialEvents = this.scheduling;
        this.loading = false;
        this.scheduleService.$schedule.unsubscribe;
      }
    );
  }

  onDragAndDrop(data: any) {
    let start = this.utilsService.clearStringData(data.event.startStr);
    let end = this.utilsService.clearStringData(data.event.endStr);

    const schedule = {
      id: data.event._def.publicId,
      title: data.event._def.title,
      start,
      end,
      status: 0,
      login_usuario: this.auth.getUser()?.login,
      paciente_id:
        data.event._def.extendedProps.paciente_id ||
        data.event._def.extendedProps.customer,
    };

    this.scheduleRepository.updateScheduling(schedule, schedule.id).subscribe(
      (result) => {
        console.log(result);

        this.getScheduling(true);
      },
      (error) => {
        console.log(error, 'update');
      }
    );
  }

  getScheduling(update: boolean) {
    let hasLocalStorage = localStorage.getItem('scheduling') || '';

    if (hasLocalStorage.length && !update) {
      let schedulingLocalStorage = JSON.parse(hasLocalStorage);
      this.calendarOptions.initialEvents = schedulingLocalStorage;
      this.loading = false;
      return;
    }

    this.loading = true;

    if (!hasLocalStorage.length || update) {
      this.scheduling = [];

      this.scheduleRepository.getScheduling(this.user).subscribe(
        (response) => {
          response.forEach((element: any) => {
            this.scheduling.push({
              id: element.id.toString(),
              title: element.title,
              start: this.utilsService.formatStringData(element.start),
              end: this.utilsService.formatStringData(element.end),
              customer: element.paciente_id,
              valor: parseInt(element.valor),
              detalhes: element.detalhes,
              pagamento: element.pagamento,
            });
          });

          localStorage.removeItem('scheduling');

          localStorage.setItem('scheduling', JSON.stringify(this.scheduling));

          this.calendarOptions.initialEvents = this.scheduling;
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
    }
  }

  onInsertScheduling(selectInfo: DateSelectArg) {
    if (!this.customerService.customers.length) {
      alert('você precisa cadastrar seu primeiro cliente');

      this.router.navigate(['/clientes']);
      return;
    }

    console.log(selectInfo);  

    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: selectInfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const date = new Date(result.date).toISOString() + '0';

        let clearDate = this.utilsService.clearStringData(date);

        let split = clearDate.split(' ');

        let start = `${split[0]} ${result.timeStart}`;
        let end = `${split[0]} ${result.timeEnd}`;

        const schedule = {
          title: result.title,
          start,
          end,
          status: 0,
          login_usuario: this.auth.getUser()?.login,
          paciente_id: result.paciente_id,
          allDay: split[0],
          valor: parseInt(result.valor),
          detalhes: result.detalhes,
          pagamento: result.pagamento,
        };

        console.log('schedule funcioanndo', schedule);

        this.scheduleRepository.postScheduling(schedule).subscribe(
          (response) => {
            const calendarApi = selectInfo.view.calendar;

            calendarApi.unselect();

            calendarApi.addEvent({
              id: response.id,
              title: response.title,
              start: this.utilsService.formatStringData(start),
              end: this.utilsService.formatStringData(end),
              paciente_id: response.paciente.id,
              valor: parseInt(result.valor),
              detalhes: result.detalhes,
              pagamento: result.pagamento,
            });

            this.getScheduling(true);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  onEditScheduling(clickInfo: EventClickArg) {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: clickInfo.event,
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result?.id) {
          const date = new Date(result.date).toISOString() + '0';

          let clearDate = this.utilsService.clearStringData(date);

          let split = clearDate.split(' ');

          let start = `${split[0]} ${result.timeStart}`;
          let end = `${split[0]} ${result.timeEnd}`;

          const schedule = {
            id: result.id,
            title: result.title,
            start,
            end,
            status: 0,
            login_usuario: this.auth.getUser()?.login,
            paciente_id: result.paciente_id,
            allDay: split[0],
            valor: parseInt(result.valor),
            detalhes: result.detalhes,
            pagamento: result.pagamento,
          };

          this.scheduleRepository
            .updateScheduling(schedule, result.id)
            .subscribe(
              (result) => {
                this.getScheduling(true);
              },
              (error) => {
                console.log(error, 'update');
              }
            );
        } else {
          if (!localStorage.getItem('scheduling')?.length) {
            this.scheduleRepository.getScheduling(this.user).subscribe(
              (response) => {
                localStorage.setItem('scheduling', JSON.stringify(response));
              },
              (error) => {
                console.log(error);
              }
            );

            clickInfo.event.remove();

            return;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Schedule() {
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loading = true;
      this.getScheduling(true);
    });
  }
}
