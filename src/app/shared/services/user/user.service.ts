import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public postUser(newUser: User): Observable<User> {
    return this.httpClient.post<User>(
      environment.baseURL + '/user',
      newUser,
      this.httpOptions
    );
  }

  public postLogin(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginRequest>(
        environment.baseURL + '/user/login',
        loginRequest,
        this.httpOptions
      )
      .pipe(
        tap((response: any) => {
          this.authService.setUser(response);
        })
      );
  }
}
