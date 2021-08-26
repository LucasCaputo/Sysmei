import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerResponse } from '../../intefaces/customer-response';

@Injectable({
  providedIn: 'root',
})
export class CustomerRepository {
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

  postFile(customerId: number, file: any): Observable<CustomerResponse> {
    return this.httpClient.post<any>(
      environment.baseURL + '/paciente/picture/' + customerId,
      file,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  getCustomer(customer: any): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/paciente?login=${customer}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  getCustomerId(customerId: number): Observable<CustomerResponse> {
    return this.httpClient.get<CustomerResponse>(
      `${environment.baseURL}/paciente/${customerId}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  getCustomerRecord(customerId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/agenda/` + customerId,
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
