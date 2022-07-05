import { EventClickArg } from "@fullcalendar/core";

export interface DialogCloseOptions {
  allDay:Date;
  data:EventClickArg;
  date: Date;
  detalhes: string;
  id: string;
  paciente_id: number;
  pagamento: string;
  end: string;
  start: string;
  title: string;
  valor: string;
  customer: any;
  employee: any;
  prestador_id: number;
}
