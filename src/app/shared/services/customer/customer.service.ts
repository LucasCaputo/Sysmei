import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { CustomerResponse } from 'src/app/shared/interfaces/customer-response';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { CustomerRepository } from '../../service-api/customer.repository';
import { SnackbarService } from '../snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public customers!: Array<CustomerResponse>;
  public formattedCustomerList!: Array<CustomerResponse>;

  public reloadCustomerListSubject = new Subject<void>();

  public searchCustomer$ = this.reloadCustomerListSubject.pipe(
    startWith(void 0),
    switchMap(() => this.searchCustomerList()),
    shareReplay(1),
    retry(1),
  );

  constructor(
    private customerRepository: CustomerRepository,
    private utilService: UtilsService,
    private snackbarService: SnackbarService,
  ) {}

  public searchCustomerList(): Observable<any[]> {
    return this.customerRepository.getCustomer().pipe(
      tap((customerList) => this.setSearchCustomerList(customerList)),
      map((customerList) => this.formatCustomerList(customerList)),
    );
  }

  private setSearchCustomerList(customerList: any): void {
    this.customers = customerList;
  }

  /** Formata dados do customer para atender a interface do autocomplete no html */
  private formatCustomerList(customerList: Array<CustomerResponse>): Array<CustomerResponse> {
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
    return this.customerRepository.postCustomer(customer).pipe(
      tap(() => {
        this.snackbarService.openSnackBar(`Parabéns! Cliente adicionado com sucesso!`, 'X', false);
        this.searchCustomerList();
      }),
      catchError(() => {
        this.snackbarService.openSnackBar(`Tivemos um erro ao adicionar, tente novamente`, 'X', true);
        return throwError('Erro no insert');
      }),
    );
  }

  postFile(customerId: number, file: any): Observable<CustomerResponse> {
    return this.customerRepository.postFile(customerId, file);
  }

  getCustomer(): Observable<any> {
    return this.customerRepository.getCustomer();
  }

  getCustomerId(customerId: number): Observable<CustomerResponse> {
    return this.customerRepository.getCustomerId(customerId);
  }

  getCustomerRecord(customerId: number): Observable<any> {
    return this.customerRepository.getCustomerRecord(customerId);
  }

  deleteCustomer(customer: any): Observable<any> {
    return this.customerRepository.deleteCustomer(customer).pipe(
      tap(() => {
        this.snackbarService.openSnackBar(`Cliente deletado com sucesso!`, 'X', false);
        this.searchCustomerList();
      }),
      catchError(() => {
        this.snackbarService.openSnackBar(`Tivemos um erro ao deletar, tente novamente`, 'X', true);
        return throwError('Erro no delete');
      }),
    );
  }

  updateCustomer(body: any, id: number) {
    return this.customerRepository.updateCustomer(body, id).pipe(
      tap(() => {
        this.snackbarService.openSnackBar(`Parabéns! Cliente atualizado com sucesso!`, 'X', false);
        this.searchCustomerList();
      }),
      catchError(() => {
        this.snackbarService.openSnackBar(`Tivemos um erro ao atualizar, tente novamente`, 'X', true);
        return throwError('Erro no update');
      }),
    );
  }
}
