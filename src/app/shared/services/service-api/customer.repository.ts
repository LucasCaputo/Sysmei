import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { CustomerResponse } from '../../interfaces/customer-response';

@Injectable({
  providedIn: 'root',
})
export class CustomerRepository {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  postCustomer(customer: any): Observable<CustomerResponse> {
    return this.httpClient.post<any>(
      environment.baseURL + '/paciente',
      customer,
      this.authService.getHeader(),
    );
  }

  postFile(customerId: number, file: any): Observable<CustomerResponse> {
    return this.httpClient.post<any>(
      environment.baseURL + '/paciente/picture/' + customerId,
      file,
      this.authService.getHeader(),
    );
  }

  getCustomer(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/paciente?login=${this.authService.getUser()?.login}`,
      this.authService.getHeader(),
    );
  }

  getCustomerId(customerId: number): Observable<CustomerResponse> {
    return this.httpClient.get<CustomerResponse>(
      `${environment.baseURL}/paciente/${customerId}`,
      this.authService.getHeader(),
    );
  }

  getCustomerRecord(customerId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/agenda/` + customerId,
      this.authService.getHeader(),
    );
  }

  deleteCustomer(customer: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseURL}/paciente/${customer.id}`,
      this.authService.getHeader(),
    );
  }

  updateCustomer(body: any, id: number) {
    return this.httpClient.put(
      environment.baseURL + '/paciente/' + id,
      body,
      this.authService.getHeader(),
    );
  }
}
