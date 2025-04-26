import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { EmployeeResponse } from '../interfaces/employee-response';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRepository {
  constructor(private httpClient: HttpClient) {}

  public getEmployee(): Observable<EmployeeResponse[]> {
    return this.httpClient.get<EmployeeResponse[]>(`${environment.baseURL}/prestador`);
  }

  public postEmployee(employee: EmployeeResponse): Observable<EmployeeResponse> {
    return this.httpClient.post<EmployeeResponse>(environment.baseURL + '/prestador', employee);
  }

  public updateEmployee(employee: EmployeeResponse): Observable<EmployeeResponse> {
    return this.httpClient.put<EmployeeResponse>(environment.baseURL + '/prestador/' + employee.id, employee);
  }

  public deleteEmployee(employee: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.baseURL}/prestador/${employee.id}`);
  }
}
