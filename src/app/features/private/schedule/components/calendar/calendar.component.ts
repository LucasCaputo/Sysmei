import { Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CalendarOptions,
  DateSelectArg, EventApi, EventClickArg, EventDropArg, EventInput, FullCalendarComponent, ViewApi
} from '@fullcalendar/angular';
import { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import { ScheduleResponse } from 'src/app/repository/intefaces/schedule-response';
import { ScheduleRepository } from 'src/app/repository/services/schedule/schedule.repository';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { SchedulingFormComponent } from '../scheduling-form/scheduling-form.component';
import { calendarSelectedOptions } from './calendar.options';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    ...calendarSelectedOptions,
    select: this.insertSchedule.bind(this),
    eventClick: this.editSchedule.bind(this),
    eventDrop: this.onDragAndDrop.bind(this),
    eventResize: this.onDragAndDrop.bind(this),
    eventsSet: this.handleEvents.bind(this),
    dateClick: this.redirectMonthToDay.bind(this)    
  }

  user = this.auth.getUser();
  currentEvents: EventApi[] = [];
  scheduling: EventInput[] = [];
  viewApi!: ViewApi;
  calendarDateTitle='...'
  todayIcon = 'primary'
  timeElapsed = Date.now();
  calendarApi:any

  constructor(
    private dialog: MatDialog,
    private scheduleRepository: ScheduleRepository,
    private scheduleService: ScheduleService,
    private customerService: CustomerService,
    private auth: AuthService,
    private router: Router,
    private utilsService: UtilsService,
    private snackbarService: SnackbarService,
  ) {}

  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();
    this.populateSchedule();
  }

  /** Recebe os dados de todos os agendamentos e popula a lista */
  private populateSchedule() {
    this.scheduleService.$schedule.subscribe(
      (scheduleResponse: Array<ScheduleResponse>) => {
        if (scheduleResponse.length) {
          this.calendarApi.removeAllEvents()
          scheduleResponse.forEach((element: ScheduleResponse) => {
            const scheduleItem = {
              id: element.id!.toString(),
              title: element.title +' - '+ this.customerService.formattedCustomerList[this.customerService.formattedCustomerList.findIndex((e)=>e.id ===element.paciente_id)]?.nome,
              start: this.utilsService.formatStringData(element.start),
              end: this.utilsService.formatStringData(element.end),
              paciente_id: element.paciente_id,
              valor: element.valor,
              pagamento: element.pagamento,
              detalhes: element.detalhes,
              prestador_id: element.prestador_id
            }

            this.scheduling.push(scheduleItem);
            this.calendarApi.view.calendar.addEvent(scheduleItem)
          });
          this.calendarNavigate();
        }
        
      }
    )
  }

  /** Atualiza agendamento por drag and drop 
   * @Input data: EventDropArg | EventResizeDoneArg
   * */
  private onDragAndDrop(data: EventDropArg | EventResizeDoneArg) {
    let start = this.utilsService.clearStringData(data.event.startStr);
    let end = this.utilsService.clearStringData(data.event.endStr);

    const schedule = {
      id: data.event?._def?.publicId,
      start,
      end,
      status: 0,
      login_usuario: this.auth.getUser()?.login,
      paciente_id: data.event._def?.extendedProps?.paciente_id,
      prestador_id: data.event._def?.extendedProps?.prestador_id,
    };

    this.scheduleRepository.updateScheduling(schedule, schedule.id).subscribe(
      (result) => {
        this.scheduleService.searchScheduleList();
        this.snackbarService.openSnackBar(
          `Agendamento atualizado com sucesso`,
          'X',
          false
        );
      },
      (error) => {
        console.log(error, 'update');
        this.snackbarService.openSnackBar(
          `Tivemos um erro para atualizar, tente novamente`,
          'X',
          true
        );
      }
    );
  }

  /** Adiciona um novo agendamento*/
  public insertSchedule(selectInfo?: DateSelectArg) {
    if (!this.customerService?.customers?.length) {
      alert('você precisa cadastrar seu primeiro cliente');

      this.router.navigate(['/clientes']);
      return;
    }

    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: selectInfo,
    });
  }

  /** Edita um agendamento */
  private editSchedule(clickInfo: EventClickArg) {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: clickInfo.event,
    });
  }

  /** Redireciona para dia selecionado quando em calendário tipo Mês */
  private redirectMonthToDay(clickInfo: DateClickArg){
    if(this.calendarApi?.view?.type === "dayGridMonth") {
      this.calendarApi.changeView('timeGridDay')
      this.calendarApi.view.calendar.gotoDate(clickInfo.date)
      this.calendarDateTitle = this.calendarApi?.view?.title
    }
  }

  /**Executa ação de navegação no calendário
   * @param action nome da ação seleciona
   */
  public calendarNavigate(action?: string) {
    if(action) {  
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
            this.calendarApi.changeView(action)
          break;
      }
    }
    
    this.calendarDateTitle = this.calendarApi?.view?.title

    this.setColorIconToday()
  }

  /** Seta cor do ícone de dia atual
   * @param calendarApi
   */
  private setColorIconToday() {
    const today = new Date(this.timeElapsed);

    if(this.calendarApi?.view && this.calendarApi.view.activeStart < today && this.calendarApi.view.activeEnd > today){
      this.todayIcon = 'primary'
    }else {
      this.todayIcon = 'secondary'
    }
  }
 
  private handleEvents(events: EventApi[]) {
    // console.log(events);
    this.currentEvents = events;
  }

}
