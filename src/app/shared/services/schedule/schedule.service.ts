import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ScheduleFormatResponse,
  ScheduleResponse,
} from 'src/app/shared/interfaces/schedule-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ScheduleRepository } from 'src/app/shared/services/service-api/schedule.repository';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { environment } from 'src/environments/environment';
import { CustomerService } from '../customer/customer.service';
import { EmployeeService } from '../employee/employee.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  schedule!: Array<ScheduleResponse>;

  public $schedule: BehaviorSubject<Array<ScheduleResponse>> =
    new BehaviorSubject<Array<ScheduleResponse>>([]);

  public formatedSchedule$: BehaviorSubject<Array<ScheduleFormatResponse>> =
    new BehaviorSubject<Array<ScheduleFormatResponse>>([]);

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private ScheduleRepository: ScheduleRepository,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private utilsService: UtilsService,
  ) {}

  /** Busca lista de agendamentos e salva na variável schedule */
  public searchScheduleList(): void {
    this.ScheduleRepository.getSchedule().subscribe(
      (scheduleList: Array<ScheduleResponse>) => {
        this.setSearchScheduledList(scheduleList);
      },
    );
  }

  private setSearchScheduledList(scheduleList: ScheduleResponse[]): void {
    this.schedule = scheduleList;
    this.$schedule.next(scheduleList);
    this.formatedSchedule$.next(this.formatScheduleResponse(scheduleList));
  }

  /** Formata retorno do back para formato que front espera receber */
  public formatScheduleResponse(
    scheduleList: Array<ScheduleResponse>,
  ): Array<ScheduleFormatResponse> {
    console.log(scheduleList)
    let formatedSchedule: Array<ScheduleFormatResponse> = [];

    scheduleList.map((element: ScheduleResponse) => {
      const scheduleFormat: ScheduleFormatResponse = {
        title:
          element.title +
          ' - ' +
          this.customerService.formattedCustomerList[
            this.customerService.formattedCustomerList.findIndex(
              (e) => e.id === element.paciente_id,
            )
          ]?.nome,
        customer: this.customerService.customers.find(
          (e: any) => e.id === element.paciente_id,
        ),
        detalhes: element.detalhes,
        employee: this.employeeService.employee.find(
          (e: any) => e.id === element.prestador_id,
        ),
        end: this.setDate(element.end),
        id: element.id?.toString(),
        schedule_id: element.id,
        pagamento: element.pagamento,
        start: this.setDate(element.start),
        Title: element.title,
        valor: element.valor,
        status: element.status,
      };

      formatedSchedule.push(scheduleFormat);
    });

    return formatedSchedule;
  }

  /** Edita objeto como back espera receber */
  public formatRequestPayload(result: any): any {
    const datePayload = this.utilsService.formatDateRequestPayload(result);

    const schedule = {
      id: result.id,
      title: result.title,
      start: datePayload.start,
      end: datePayload.end,
      paciente_id: result.customer?.id,
      valor: parseInt(result.valor),
      detalhes: result.detalhes,
      pagamento: result.pagamento,
      prestador_id: result.employee?.id,
      status: result.status,
    };

    return schedule;
  }

  /**Formata data */
  public setDate(_date: string): Date {
    const allDayArray: Array<string> = _date?.split(' ')[0]?.split('-');
    const time: Array<string> = _date?.split(' ')[1]?.split(':');

    const date = new Date(
      parseInt(allDayArray[0]),
      parseInt(allDayArray[1]) - 1,
      parseInt(allDayArray[2]),
      parseInt(time[0]),
      parseInt(time[1]),
    );

    return date;
  }

  public postScheduling(body: any): Observable<any> {
    const payload = {
      ...body,
      login_usuario: this.authService.getUser()?.login,
      allDay: body.start.split(' ')[0],
    };

    return this.ScheduleRepository.postScheduling(payload);
  }

  deleteScheduling(customerId: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseURL}/agenda/${customerId}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      },
    );
  }

  public updateScheduling(body: any, id: number): Observable<any> {
    const payload = {
      ...body,
      login_usuario: this.authService.getUser()?.login,
      status: body.status,
      allDay: body.start.split(' ')[0],
    };

    return this.ScheduleRepository.updateScheduling(payload, id);
  }
}
