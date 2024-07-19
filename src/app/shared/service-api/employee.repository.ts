import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getEmployee(): Observable<EmployeeResponse[]> {
    const user = this.authService.getUser();

    let params = new HttpParams();

    if (user?.login) {
      params = params.set('login', user.login);
    }

    return this.httpClient.get<EmployeeResponse[]>(
      `${environment.baseURL}/prestador`,
      {
        headers: this.authService.getHeader().headers,
        params: params,
      },
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
