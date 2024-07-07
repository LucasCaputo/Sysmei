import { LoginRequest, UserInterface } from "../../interfaces/user";

interface User {
    email: string | null;
    password: string | null
}

interface NewUser {
    email: string | null;
    name: string | null
    password: string | null
    phone: string | null
}

export function FormatLoginPayload(user: Partial<User>): LoginRequest {
    return {
        usuario: user.email || "" ,
        senha: user.password || "" 
    }
}

export function FormatNewUserPayload(user: Partial<NewUser>): Partial<UserInterface> {
    return {
        login: user.email || '',
        nome: user.name || "" ,
        senha: user.password || "",
        telefone: user.phone || "" 
    }
}