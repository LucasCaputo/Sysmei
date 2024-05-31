import { CustomerResponse } from "./customer-response";
import { EmployeeResponse } from "./employee-response";

export interface ScheduleResponse {
  allDay: string;
  detalhes: string;
  end: string;
  id?: number;
  login_usuario: string;
  paciente_id: number;
  pagamento: string;
  start: string;
  status: number;
  title: string;
  valor: number;
  prestador_id: number;
}

export interface ScheduleFormatResponse {
  customer?: CustomerResponse;
  detalhes: string;
  employee?: EmployeeResponse
  end: Date;
  id?: string;
  schedule_id?:number;
  pagamento: string;
  start: Date;
  title: string;
  Title: string;
  valor: number;
}