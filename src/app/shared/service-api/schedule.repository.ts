import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
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
    );
  }

  public getScheduleByDate(
    startDate: string,
    endDate: string,
  ): Observable<ScheduleResponse[]> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/agenda/prestador?login=${this.authService.getUser()?.login}&dataInicio=${startDate}&dataFim=${endDate}&prestadorId=all`,
    );
  }

  public deleteScheduling(customerId: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseURL}/agenda/${customerId}`,
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
    );
  }
}