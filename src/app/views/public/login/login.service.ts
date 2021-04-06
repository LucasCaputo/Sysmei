import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login, LoginResponse } from './login.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public postLogin(login: Login): Observable<LoginResponse> {
    return this.httpClient
      .post<Login>(environment.baseURL + '/user/login', login, this.httpOptions)
      .pipe(
        tap((response: any) => {
          this.authService.setUser(response);
        })
      );
  }
}
