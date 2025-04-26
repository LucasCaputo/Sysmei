import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerResponse } from '../interfaces/customer-response';

@Injectable({
  providedIn: 'root',
})
export class CustomerRepository {
  constructor(private httpClient: HttpClient) {}

  postCustomer(customer: any): Observable<CustomerResponse> {
    return this.httpClient.post<any>(environment.baseURL + '/paciente', customer);
  }

  postFile(customerId: number, file: any): Observable<CustomerResponse> {
    return this.httpClient.post<any>(environment.baseURL + '/paciente/picture/' + customerId, file);
  }

  getCustomer(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseURL}/paciente`);
  }

  getCustomerId(customerId: number): Observable<CustomerResponse> {
    return this.httpClient.get<CustomerResponse>(`${environment.baseURL}/paciente/${customerId}`);
  }

  getCustomerRecord(customerId: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseURL}/agenda/` + customerId);
  }

  deleteCustomer(customer: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.baseURL}/paciente/${customer.id}`);
  }

  updateCustomer(body: any, id: number) {
    return this.httpClient.put(environment.baseURL + '/paciente/' + id, body);
  }
}
