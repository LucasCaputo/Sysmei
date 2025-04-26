import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../../interfaces/user';
import { CacheService } from '../../service-api/cache';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserInterface | undefined>(undefined);

  public user: UserInterface | undefined;

  private token: string | undefined;

  public user$ = this.userSubject;

  constructor(private cacheService: CacheService) {}

  setUser(user: any) {
    this.user = user;
    this.userSubject.next(user);
  }

  getUser(): UserInterface | undefined {
    return this.user || undefined;
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
    this.cacheService.clearAllCache();
    localStorage.clear();
  }

  isLoged() {
    return !!this.getToken();
  }
}
