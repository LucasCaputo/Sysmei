import { Injectable } from '@angular/core';
import { User } from 'src/app/views/public/shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | undefined;

  private token: string | undefined;

  constructor() {}

  setUser(user: any) {
    this.user = user.usuario;
    this.token = user.token;

    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('token', JSON.stringify(this.token));
  }

  getUser() {
    if (this.user) {
      return this.user;
    }

    const logedUser = localStorage.getItem('user');

    if (logedUser) {
      this.user = JSON.parse(logedUser);
      return this.user;
    }

    return undefined;
  }

  getToken() {
    if (this.token) {
      return this.token;
    }

    const logedToken = localStorage.getItem('token');

    if (logedToken) {
      this.token = JSON.parse(logedToken);
      return this.token;
    }

    return undefined;
  }

  logout() {
    delete this.user;
    delete this.token;
    localStorage.clear();
  }

  isLoged() {
    if (this.getUser() && this.getToken()) {
      return true;
    }
    return false;
  }
}
