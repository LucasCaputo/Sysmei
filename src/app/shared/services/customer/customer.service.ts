import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CustomerResponse } from 'src/app/shared/interfaces/customer-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { environment } from 'src/environments/environment';
import { CustomerRepository } from '../service-api/customer.repository';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public customers!: Array<CustomerResponse>;
  public customers$: Subject<Array<CustomerResponse>> = new Subject<
    Array<CustomerResponse>
  >();
  public formattedCustomerList!: Array<CustomerResponse>;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private customerRepository: CustomerRepository,
    private utilService: UtilsService,
  ) {}

  public searchCustomerList(): void {
    this.customerRepository.getCustomer().subscribe((customerList) => {
      this.setSearchCustomerList(customerList);
    });
  }

  private setSearchCustomerList(customerList: any): void {
    this.customers = customerList;
    this.customers$.next(this.formatCustomerList(this.customers));
  }

  /** Formata dados do customer para atender a interface do autocomplete no html */
  private formatCustomerList(
    customerList: Array<CustomerResponse>,
  ): Array<CustomerResponse> {
    let list: Array<CustomerResponse> = [];
    let letter = '';

    if (customerList?.length) {
      customerList.forEach((customer, index) => {
        let phone: string = customer.telefone1;

        if (index === 0) {
          letter = customer.nome[0]?.toUpperCase();

          list.push({
            ...customer,
            inicial: letter,
            isFirstLetter: true,
            text: `${customer.nome} - ${this.utilService.formatPhone(phone)}`,
          });
        } else {
          if (letter === customer.nome[0]?.toUpperCase()) {
            list.push({
              ...customer,
              inicial: letter,
              isFirstLetter: false,
              text: `${customer.nome} - ${this.utilService.formatPhone(phone)}`,
            });
          } else {
            letter = customer.nome[0]?.toUpperCase();

            list.push({
              ...customer,
              inicial: letter,
              isFirstLetter: true,
              text: `${customer.nome} - ${this.utilService.formatPhone(phone)}`,
            });
          }
        }
      });
    }
    this.formattedCustomerList = list;

    return list;
  }

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

  getCustomer(customer: any): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/paciente?login=${customer.login}`,
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
      `${environment.baseURL}/agenda/?id=${customerId}`,
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
