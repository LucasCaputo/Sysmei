import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/angular';
import { SchedulingFormComponent } from '../scheduling-form/scheduling-form.component';
import { ScheduleService } from '../../schedule.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CustomerService } from '../../../customer/customer.service';

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
    selectLongPressDelay: 100,
    locale: 'pt-br',
  };

  scheduling: EventInput[] = [];
  loading = false;

  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private router: Router,
    private utilsService: UtilsService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    let hasLocalStorage = localStorage.getItem('scheduling') || '';

    if (hasLocalStorage.length) {
      let schedulingLocalStorage = JSON.parse(hasLocalStorage);
      this.calendarOptions.initialEvents = schedulingLocalStorage;
      this.loading = false;
    } else {
      this.scheduleService.getScheduling(this.user).subscribe(
        (response) => {
          response.forEach((element: any) => {
            this.scheduling.push({
              id: element.id.toString(),
              title: element.title,
              start: this.utilsService.formatStringData(element.start),
              end: this.utilsService.formatStringData(element.end),
              customer: element.paciente_id,
            });
          });

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

      this.customerService.getCustomer(this.user).subscribe(
        (response) => {
          localStorage.removeItem('customer');
          localStorage.setItem('customer', JSON.stringify(response));
        },
        (error) => {
          console.log(error);
        }
      );
    }
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

      this.scheduleService.getScheduling(this.user).subscribe(
        (response) => {
          // debugger;
          response.forEach((element: any) => {
            this.scheduling.push({
              id: element.id.toString(),
              title: element.title,
              start: this.utilsService.formatStringData(element.start),
              end: this.utilsService.formatStringData(element.end),
              customer: element.paciente_id,
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
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: selectInfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // debugger;
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
          status: true,
          login_usuario: this.auth.getUser()?.login,
          paciente_id: result.paciente_id,
        };

        this.scheduleService.postScheduling(schedule).subscribe(
          (response) => {
            // debugger;
            const calendarApi = selectInfo.view.calendar;

            calendarApi.unselect();

            calendarApi.addEvent({
              id: response.id,
              title: response.title,
              start: this.utilsService.formatStringData(start),
              end: this.utilsService.formatStringData(end),
              paciente_id: response.paciente.id,
            });

            this.scheduleService
              .getScheduling(this.user)
              .subscribe((response) => {
                localStorage.removeItem('scheduling');

                localStorage.setItem('scheduling', JSON.stringify(response));

                // debugger;
              });
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
        // debugger;
        if (result?.id) {
          this.scheduleService.updateScheduling(result, result.id).subscribe(
            (result) => {
              this.getScheduling(true);
            },
            (error) => {
              console.log(error, 'update');
            }
          );
        } else {
          if (!localStorage.getItem('scheduling')?.length) {
            this.scheduleService.getScheduling(this.user).subscribe(
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

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
