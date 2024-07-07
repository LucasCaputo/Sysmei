export interface UserInterface {
  enabled: boolean;
  login: string;
  nome: string;
  senha: string;
  senhaAntiga: string,
  status: boolean;
  telefone: string;
}

export interface LoginRequest {
  usuario: string;
  senha: string;
}

export interface LoginResponse {
  dataFim: Date;
  dataInicio: Date;
  token: string;
  usuario: UserInterface;
}
