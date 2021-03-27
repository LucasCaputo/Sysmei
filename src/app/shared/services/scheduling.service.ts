import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scheduling } from '../interfaces/scheduling.interface';

@Injectable({
    providedIn: 'root'
})
export class SchedulingService {

    apiUrl = 'http://localhost:8080/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    public postScheduling(scheduling: any): Observable<Scheduling> {
        return this.httpClient.post<any>(this.apiUrl, scheduling, this.httpOptions);
    }

}