import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserInterface | undefined>(
    undefined,
  );

  public user: UserInterface | undefined;

  private token: string | undefined;

  constructor() {}

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.userSubject.next(user);
  }

  getUserObservable() {
    return this.userSubject.asObservable();
  }

  getUser(): UserInterface | undefined {
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
      return this.user;
    }

    return undefined;
  }

  setToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
    this.token = token;
  }

  getToken() {
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
    return !!this.getToken();
  }
}
