import { UserInterface } from '../../interfaces/user';

interface NewUser {
  email: string | null;
  name: string | null;
  password: string | null;
  phone: string | null;
}

export function FormatNewUserPayload(
  user: Partial<NewUser>,
): Partial<UserInterface> {
  return {
    login: user.email || '',
    nome: user.name || '',
    senha: user.password || '',
    telefone: user.phone || '',
  };
}
