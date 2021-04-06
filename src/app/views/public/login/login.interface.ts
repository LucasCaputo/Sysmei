export interface Login {
  nome: string;
  senha: string;
}

export interface LoginResponse {
  dataFim: Date;
  dataInicio: Date;
  token: string;
  usuario: {
    login: string;
    nome: string;
    senha: string;
    telefone: string;
  };
}
