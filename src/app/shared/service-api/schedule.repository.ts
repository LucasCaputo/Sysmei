import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {
  getCurrentDate,
  getDate30DaysAgo,
} from 'src/app/shared/services/utils/utils.service';
import { environment } from 'src/environments/environment';
import { ScheduleResponse } from '../interfaces/schedule-response';

@Injectable({
  providedIn: 'root',
})
export class ScheduleRepository {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  public postScheduling(scheduling: any): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseURL + '/agenda',
      scheduling,
      this.authService.getHeader(),
    );
  }

  public getSchedule(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/agenda/prestador?login=${this.authService.getUser()?.login}&dataInicio=${getDate30DaysAgo()}&dataFim=${getCurrentDate()}&prestadorId=all`,
      this.authService.getHeader(),
    );
  }

  public getScheduleByDate(
    startDate: string,
    endDate: string,
  ): Observable<ScheduleResponse[]> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/agenda/prestador?login=${this.authService.getUser()?.login}&dataInicio=${startDate}&dataFim=${endDate}&prestadorId=all`,
      this.authService.getHeader(),
    );
  }

  public deleteScheduling(customerId: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseURL}/agenda/${customerId}`,
      this.authService.getHeader(),
    );
  }

  public updateScheduling(body: any, id: number) {
    return this.httpClient.put(environment.baseURL + '/agenda/' + id, body, {
      headers: {
        Authorization: this.authService.getToken()!,
        PacienteID: `${body.paciente_id}`,
        PrestadorID: `${body.prestador_id}`,
      },
    });
  }

  public patchStatus(body: { status: number }, id: number) {
    return this.httpClient.patch(
      environment.baseURL + '/agenda/' + id + '/status',
      body,
      this.authService.getHeader(),
    );
  }
}
