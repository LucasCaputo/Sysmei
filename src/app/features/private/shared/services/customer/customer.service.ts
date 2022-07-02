import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerRepository } from 'src/app/repository/services/customer/customer.repository';
import { CustomerResponse } from 'src/app/repository/intefaces/customer-response';
import { CustomerData } from '../../dialogs/schedule-dialog/interfaces/customer-data';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { User } from 'src/app/features/public/shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public customers!: Array<CustomerResponse>;
  public $customers: BehaviorSubject<Array<CustomerResponse>> =
    new BehaviorSubject<Array<CustomerResponse>>([]);
  public formattedCustomerList!: Array<CustomerData>;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private customerRepository: CustomerRepository,
    private utilService: UtilsService
  ) {}

  /** Busca lista de usuários e salva na variável customers */
  public searchCustomerList(): void {
    this.customerRepository.getCustomer(this.authService.getUser()?.login).subscribe((customerList) => {
      this.customers = customerList;
      this.$customers.next(customerList);
      this.formatCustomerList(this.customers);
    });
  }

  /** Formata dados do customer para atender a interface do autocomplete no html */
  private formatCustomerList(customerList: Array<CustomerResponse>): void {
    let list: Array<CustomerData> = [];
    customerList.forEach((element: any) => {
      let phone: string = element.telefone1;
      list.push({
        ...element,
        text: `${element.nome} - ${this.utilService.formatPhone(phone)}`,
      });
    });
    this.formattedCustomerList = list;
  }

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
      `${environment.baseURL}/paciente?login=${customer.login}`,
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
      `${environment.baseURL}/agenda/?id=${customerId}`,
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
