import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NewUser } from './new-user.interface';

@Injectable({
  providedIn: 'root',
})
export class NewUserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public postUser(newUser: any): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseURL + '/user',
      newUser,
      this.httpOptions
    );
  }
}
