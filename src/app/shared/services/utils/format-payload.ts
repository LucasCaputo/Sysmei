import { LoginRequest } from "../../interfaces/user";

interface User {
    email: string | null;
    password: string | null
}

export function FormatLoginPayload(user: Partial<User>): LoginRequest {
    return {
        usuario: user.email || "" ,
        senha: user.password || "" 
    }
}