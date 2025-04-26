export interface ScheduleRequestPayload {
  id: number | string;
  title: string;
  start: string;
  end: string;
  paciente_id?: number;
  valor: number;
  detalhes?: string;
  pagamento?: string;
  prestador_id?: number;
  status: ScheduleStatus;
}

export type ScheduleStatus = 'CONFIRMAR' | 'CONFIRMADO' | 'EM_ATENDIMENTO' | 'CLIENTE_CHEGOU' | 'ATENDIDO' | 'DESMARCOU' | 'FALTOU';
