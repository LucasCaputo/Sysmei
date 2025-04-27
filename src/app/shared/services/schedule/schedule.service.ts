import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ScheduleFormatResponse, ScheduleResponse } from 'src/app/shared/interfaces/schedule-response';
import { ScheduleRepository } from 'src/app/shared/service-api/schedule.repository';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { CalendarStateService } from '../calendar/calendar-state.service';
import { CustomerService } from '../customer/customer.service';
import { EmployeeService } from '../employee/employee.service';
import { SnackbarService } from '../snackbar.service';
import { formatDate } from '../utils/date.utils';
import { FormatCalendarDate } from '../utils/format-calendar-payload';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  schedule!: Array<ScheduleResponse>;

  public schedule$ = new Subject<Array<ScheduleResponse>>();

  public formatedSchedule$ = new Subject<Array<ScheduleFormatResponse>>();

  public reloadScheduleSubject = new Subject();

  public searchSchedule$ = this.reloadScheduleSubject.pipe(
    switchMap(() =>
      this.searchScheduleList({
        startDate: formatDate(this.calendarStateService.date.startStr),
        endDate: formatDate(this.calendarStateService.date.endStr),
      }),
    ),
    shareReplay(1),
    retry(1),
  );

  constructor(
    private scheduleRepository: ScheduleRepository,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private utilsService: UtilsService,
    private snackbarService: SnackbarService,
    private calendarStateService: CalendarStateService,
  ) {}

  public reloadSchedule(): void {
    this.reloadScheduleSubject.next();
  }

  public searchScheduleList(date: { startDate: string; endDate: string }): Observable<any> {
    return this.scheduleRepository.getScheduleByDate(date.startDate, date.endDate).pipe(
      tap((scheduleList) => this.setSearchScheduledList(scheduleList)),
      map((schedudle) => this.formatScheduleResponse(schedudle)),
    );
  }

  private setSearchScheduledList(scheduleList: ScheduleResponse[]): void {
    this.schedule = scheduleList;
    this.schedule$.next(scheduleList);
    this.formatedSchedule$.next(this.formatScheduleResponse(scheduleList));
  }

  /** Formata retorno do back para formato que front espera receber */
  public formatScheduleResponse(scheduleList: Array<ScheduleResponse>): Array<ScheduleFormatResponse> {
    let formatedSchedule: Array<ScheduleFormatResponse> = [];

    scheduleList.map((element: ScheduleResponse) => {
      const scheduleFormat: ScheduleFormatResponse = {
        title:
          element.title +
          ' - ' +
          this.customerService.formattedCustomerList[this.customerService.formattedCustomerList.findIndex((e) => e.id === element.paciente_id)]?.nome,
        customer: this.customerService.customers.find((e: any) => e.id === element.paciente_id),
        detalhes: element.detalhes,
        employee: this.employeeService.employee.find((e: any) => e.id === element.prestador_id),
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

  public setDate(_date: string): Date {
    return FormatCalendarDate(_date);
  }

  public postScheduling(body: any): Observable<any> {
    const payload = {
      ...body,
      allDay: body.start.split(' ')[0],
    };

    return this.scheduleRepository.postScheduling(payload);
  }

  public deleteScheduling(customerId: any): Observable<any> {
    return this.scheduleRepository.deleteScheduling(customerId).pipe(
      tap(() => {
        this.reloadSchedule();
        this.snackbarService.openSnackBar(`Agendamento deletado com sucesso`, 'X', false);
      }),
      catchError(() => {
        this.snackbarService.openSnackBar(`Tivemos um erro para deletar, tente novamente`, 'X', true);
        return throwError('Erro no update');
      }),
    );
  }

  public updateScheduling(body: any, id: number): Observable<any> {
    const payload = {
      ...body,
      status: body.status,
      allDay: body.start.split(' ')[0],
    };

    return this.scheduleRepository.updateScheduling(payload, id).pipe(
      tap(() => {
        this.reloadSchedule();
        this.snackbarService.openSnackBar(`Agendamento atualizado com sucesso`, 'X', false);
      }),
      catchError(() => {
        this.snackbarService.openSnackBar(`Tivemos um erro para atualizar, tente novamente`, 'X', true);
        return throwError('Erro no update');
      }),
    );
  }

  public patchStatus(body: { status: string }, id: number) {
    return this.scheduleRepository.patchStatus(body, id).pipe(
      tap(() => {
        this.reloadSchedule();
        this.snackbarService.openSnackBar(`Status alterado com sucesso`, 'X', false);
      }),
      catchError(() => {
        this.snackbarService.openSnackBar(`Tivemos um erro para alterar o status, tente novamente`, 'X', true);
        return throwError('Erro no update');
      }),
    );
  }
}
