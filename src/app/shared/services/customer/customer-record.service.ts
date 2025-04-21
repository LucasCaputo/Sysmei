import { Injectable, signal } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, retry, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { CustomerRepository } from '../../service-api/customer.repository';
import { formatViewDate } from '../utils/date.utils';
import { CustomerRecordView } from './interfaces/customer-record-interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerRecordService {
  private readonly customerId = signal(0)

  public reloadCustomerRecordSubject = new Subject<void>();

  public customerRecord$ = this.reloadCustomerRecordSubject.pipe(
    startWith(void 0),
    switchMap(() => this.getCustomerRecord(this.customerId())),
    map((record) => this.formatCustomerRecord(record)),
    shareReplay(1),
    retry(1),
  );

  constructor(
    private customerRepository: CustomerRepository,
  ) {}

  private getCustomerRecord(customerId: number | undefined): Observable<any> {
    if(!customerId) {
      return of([{}])
    }
    return this.customerRepository.getCustomerRecord(customerId);
  }

  private formatCustomerRecord(data: any): CustomerRecordView[] {
    const dataSource: any[] = [];

    data?.forEach((e: any) => {
      let data = formatViewDate(e.start)

      dataSource.push({
        ...e,
        data,
        titulo: e.title.slice(0, 20),
        valor: e.valor || 'R$',
        description: e.detalhes || 'Sem observações',
      });
    });

    return dataSource;
  }

  public setCustomerRecordId(id: number): void {
    this.customerId.set(id)
  }

  public getCustomerRecordId(): number {
    return this.customerId();
  }
}
