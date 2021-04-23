import { Injectable } from '@angular/core';
import { CustomerResponse } from 'src/app/views/private/customer/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private customer: CustomerResponse | undefined;

  constructor() {}

  setCustomer(customer: any) {
    this.customer = customer;

    localStorage.setItem('customer', JSON.stringify(this.customer));
  }

  getCustomer() {
    if (this.customer) {
      return this.customer;
    }

    const localCustomers = localStorage.getItem('customer');

    if (localCustomers) {
      this.customer = JSON.parse(localCustomers);
      return this.customer;
    }

    return undefined;
  }
}
