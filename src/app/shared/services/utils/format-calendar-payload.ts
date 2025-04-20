import { CustomerResponse } from '../../interfaces/customer-response';
import { EmployeeResponse } from '../../interfaces/employee-response';
import { ScheduleFormatResponse, ScheduleResponse } from '../../interfaces/schedule-response';

export function FormatCalendarPayload(employeeList: EmployeeResponse[], customerList: CustomerResponse[], scheduleList: ScheduleResponse[]): any {
  let formatedSchedule;

  scheduleList.map((element: ScheduleResponse) => {
    const scheduleFormat: ScheduleFormatResponse = {
      title: element.title + ' - ' + customerList[customerList.findIndex((e) => e.id === element.paciente_id)]?.nome,
      customer: customerList.find((e: any) => e.id === element.paciente_id),
      detalhes: element.detalhes,
      employee: employeeList.find((e: any) => e.id === element.prestador_id),
      end: FormatCalendarDate(element.end),
      id: element.id?.toString(),
      schedule_id: element.id,
      pagamento: element.pagamento,
      start: FormatCalendarDate(element.start),
      Title: element.title,
      valor: element.valor,
      status: element.status,
    };

    formatedSchedule.push(scheduleFormat);
  });

  return formatedSchedule;
}

export function FormatCalendarDate(_date: string): Date {
  const allDayArray: Array<string> = _date?.split(' ')[0]?.split('-');
  const time: Array<string> = _date?.split(' ')[1]?.split(':');

  const date = new Date(parseInt(allDayArray[0]), parseInt(allDayArray[1]) - 1, parseInt(allDayArray[2]), parseInt(time[0]), parseInt(time[1]));

  return date;
}
