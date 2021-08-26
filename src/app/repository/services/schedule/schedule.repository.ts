import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleRepository {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public postScheduling(scheduling: any): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseURL + '/agenda',
      scheduling,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  getScheduling(scheduling: any): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/agenda?login=${scheduling.login}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  /** Busca lista de todos os agendamentos */
  public getSchedule(user: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/agenda?login=${user}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  deleteScheduling(customerId: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseURL}/agenda/${customerId}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  updateScheduling(body: any, id: number) {
    return this.httpClient.put(environment.baseURL + '/agenda/' + id, body, {
      headers: {
        Authorization: this.authService.getToken()!,
      },
    });
  }
}
