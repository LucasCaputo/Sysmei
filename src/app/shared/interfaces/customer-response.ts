export interface CustomerResponse {
  text: string;
  inicial: string;
  isFirstLetter: boolean;

  email: string;
  endereco: string;
  enderecoNum: string;
  estado: string;
  estadoCivil: string;
  id: number;
  indicacao: string;
  login_usuario: string;
  nascimento: string;
  nome: string;
  ocupacao: string;
  planoSaude: string;
  responsavel: string;
  rg: string;
  sexo: string;
  socialName: string;
  telefone1: string;
  telefone2: string;
  telefone3: string;
  documentsUrl: DocumentsUrl;
}

export interface DocumentsUrl {
  id: number;
  utl: string;
}
