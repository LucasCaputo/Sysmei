export interface User {
  enabled: boolean;
  login: string;
  nome: string;
  senha: string;
  status: boolean;
  telefone: string;
}

export interface LoginRequest {
  nome: string;
  senha: string;
}

export interface LoginResponse {
  dataFim: Date;
  dataInicio: Date;
  token: string;
  usuario: User;
}
