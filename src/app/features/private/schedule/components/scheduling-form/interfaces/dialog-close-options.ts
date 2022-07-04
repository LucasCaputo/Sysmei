import { EventClickArg } from "@fullcalendar/core";

export interface DialogCloseOptions {
  data:EventClickArg;
  date: Date;
  detalhes: string;
  id: string;
  paciente_id: number;
  pagamento: string;
  timeEnd: string;
  timeStart: string;
  title: string;
  valor: string;
  prestador_id: number;
}
