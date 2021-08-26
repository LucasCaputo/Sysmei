import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EmployeeResponse } from '../../intefaces/employee-response';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRepository {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  /** Busca lista de prestadores */
  getEmployee(): Observable<Array<EmployeeResponse>> {
    return this.httpClient.get<Array<EmployeeResponse>>(
      `${environment.baseURL}/prestador?login=${this.authService.getUser()?.login
      }`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  /** Cadastra novo prestador */
  postEmployee(employee: EmployeeResponse): Observable<EmployeeResponse> {
    return this.httpClient.post<EmployeeResponse>(
      environment.baseURL + '/prestador',
      employee,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }
}
