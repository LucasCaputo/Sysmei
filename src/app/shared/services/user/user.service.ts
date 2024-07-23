import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  LoginRequest,
  LoginResponse,
  UserInterface,
} from '../../interfaces/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  public postUser(newUser: Partial<UserInterface>): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(
      environment.baseURL + '/user',
      newUser,
      {
        headers: {
          'Skip-Interceptor': 'true',
        },
      },
    );
  }

  public postLogin(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginRequest>(environment.baseURL + '/user/login', loginRequest, {
        headers: {
          'Skip-Interceptor': 'true',
        },
      })
      .pipe(
        tap((response: any) => {
          this.authService.setUser(response.usuario);
          this.authService.setToken(response.token);
        }),
      );
  }

  public getUser(): Observable<any> {
    return this.httpClient.get(environment.baseURL + '/user');
  }

  public updateUser(body: Partial<UserInterface>): Observable<any> {
    return this.httpClient.put(environment.baseURL + '/user', body);
  }

  public getTokenValidation(token: string): Observable<any> {
    return this.httpClient.get(environment.baseURL + '/user/token', {
      params: {
        code: token,
      },
    });
  }
}
