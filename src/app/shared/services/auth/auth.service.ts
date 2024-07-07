import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<UserInterface | undefined> = new BehaviorSubject<UserInterface | undefined>(undefined);

  public user: UserInterface | undefined;

  private token: string | undefined;

  constructor() {}

  setUser(user: any) {
    this.user = user;
    this.userSubject.next(user)
  }

  getUserObservable() {
    return this.userSubject.asObservable();
  }

  getUser(): UserInterface | undefined {
    if (this.user) {
      return this.user;
    }

    return undefined;
  }

  setToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
    this.token = token
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
    return !!this.getToken()
  }
}
