import { Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CalendarOptions,
  DateSelectArg, EventApi, EventClickArg, EventDropArg, EventInput, FullCalendarComponent, ViewApi
} from '@fullcalendar/angular';
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import { ScheduleResponse } from 'src/app/repository/intefaces/schedule-response';
import { ScheduleRepository } from 'src/app/repository/services/schedule/schedule.repository';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { DialogCloseOptions } from '../scheduling-form/interfaces/dialog-close-options';
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
    eventsSet: this.handleEvents.bind(this)
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
      id: data.event?._def.publicId,
      title: data.event?._def.title,
      start,
      end,
      status: 0,
      login_usuario: this.auth.getUser()?.login,
      paciente_id: data.event._def?.extendedProps?.paciente_id,
      prestador_id: data.event._def?.extendedProps?.prestador_id,
    };

    this.scheduleRepository.updateScheduling(schedule, schedule.id).subscribe(
      (result) => {
        this.scheduleService.searchScheduleList()
      },
      (error) => {
        console.log(error, 'update');
      }
    );
  }

  /** Edita objeto como back espera receber */
  private formatRequestPayload(result: any): ScheduleResponse {
    
    const datePayload = this.utilsService.formatDateRequestPayload(result);

    const schedule = {
      title: result.title,
      start: datePayload.start,
      end: datePayload.end,
      status: 0,
      login_usuario: this.auth.getUser()?.login!,
      paciente_id: result.customer?.id,
      allDay: datePayload.allDay,
      valor: parseInt(result.valor),
      detalhes: result.detalhes,
      pagamento: result.pagamento,
      prestador_id: result.employee?.id,
    };

    return schedule
  }

  /** Edita dados para inserir no formato do calendário 
   * @Input result: DialogCloseOptions
   * @Output object: EventInput
   * */
  private formatCalendarData(result: DialogCloseOptions) : EventInput{
    const schedule = this.formatRequestPayload(result)

    return {  
      id: result.id,
      title: result.title,
      start: this.utilsService.formatStringData(schedule.start),
      end: this.utilsService.formatStringData(schedule.end),
      prestador_id: result.employee.id,
      valor: parseInt(result.valor),
      detalhes: result.detalhes,
      pagamento: result.pagamento,
      paciente_id: result.customer.id
    }
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

    dialogRef.afterClosed().subscribe((result) => {
      if( result === 'close') {
        return
      }
        
      const scheduleCalendar = this.formatCalendarData(result)
              
      this.calendarApi.view.calendar.unselect();

      this.calendarApi.view.calendar.addEvent(scheduleCalendar);
     
    });
  }

  /** Edita um agendamento */
  private editSchedule(clickInfo: EventClickArg) {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: clickInfo.event,
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result === 'close') {
          return
        }

        const scheduleCalendar = this.formatCalendarData(result)

        clickInfo.view.calendar.addEvent(scheduleCalendar);
        clickInfo.event.remove();
      },
      (error) => {
        console.log(error);
      }
    );
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
