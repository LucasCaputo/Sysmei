import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerResponse } from '../customer/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  postCustomer(customer: any): Observable<CustomerResponse> {
    return this.httpClient.post<any>(
      environment.baseURL + '/paciente',
      customer,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  getCustomer(customer: any): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/paciente?login=${customer.login}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  deleteCustomer(customer: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseURL}/paciente/${customer.id}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  updateCustomer(body: any, id: number) {
    return this.httpClient.put(environment.baseURL + '/paciente/' + id, body, {
      headers: {
        Authorization: this.authService.getToken()!,
      },
    });
  }
}
