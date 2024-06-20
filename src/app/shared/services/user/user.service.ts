import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse, User } from '../../interfaces/user';
import { AuthService } from '../auth/auth.service';

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
    private authService: AuthService,
  ) {}

  public postUser(newUser: User): Observable<User> {
    return this.httpClient.post<User>(
      environment.baseURL + '/user',
      newUser,
      this.httpOptions,
    );
  }

  public postLogin(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginRequest>(
        environment.baseURL + '/user/login',
        loginRequest,
        this.httpOptions,
      )
      .pipe(
        tap((response: any) => {
          this.authService.setUser(response);
          const token = localStorage.getItem('token')?.replace('"', '').replace("Bearer", "").trim().replace('"', '')
          console.log(token)
          if(token) {
            this.getUser(token).subscribe((e) => console.log(e))
          }
        }),
      );
  }


  public getUser(code: string): Observable<any> {
    return this.httpClient
      .get(environment.baseURL + '/user/token?code=' + code)
  }
}
