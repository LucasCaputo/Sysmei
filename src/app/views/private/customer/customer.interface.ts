import { NewUser } from '../../public/new-user/new-user.interface';

export interface CustomerResponse {
  id: number;
  nome: string;
  email: string;
  usuario: NewUser;
  nascimento: string;
  responsavel: string;
  sexo: string;
  estadoCivil: string;
  indicacao: string;
  planoSaude: string;
  convenio: string;
  rg: string;
  cpf: string;
  ocupacao: string;
  endereco: string;
  enderecoNum: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  telefones: [
    {
      id: number;
      numero: string;
    }
  ];
  telefone1: string;
  telefone2: string;
  telefone3: string;
  pseudonimo: string;

  documentsUrl: [
    {
      id: number;
      url: string;
    }
  ];
}
