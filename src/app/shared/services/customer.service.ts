import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer.interface';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    apiUrl = 'http://localhost:8080/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    public postCustomer(customer: any): Observable<Customer> {
        return this.httpClient.post<any>(this.apiUrl, customer, this.httpOptions);
    }

}