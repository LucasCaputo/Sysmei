import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { EmployeeResponse } from '../interfaces/employee-response';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRepository {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  public getEmployee(): Observable<Array<EmployeeResponse>> {
    return this.httpClient.get<Array<EmployeeResponse>>(
      `${environment.baseURL}/prestador?login=${this.authService.getUser()?.login}`,
      this.authService.getHeader(),
    );
  }

  public postEmployee(
    employee: EmployeeResponse,
  ): Observable<EmployeeResponse> {
    return this.httpClient.post<EmployeeResponse>(
      environment.baseURL + '/prestador',
      employee,
      this.authService.getHeader(),
    );
  }

  public updateEmployee(
    employee: EmployeeResponse,
  ): Observable<EmployeeResponse> {
    return this.httpClient.put<EmployeeResponse>(
      environment.baseURL + '/prestador/' + employee.id,
      employee,
      this.authService.getHeader(),
    );
  }

  public deleteEmployee(employee: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseURL}/prestador/${employee.id}`,
      this.authService.getHeader(),
    );
  }
}
