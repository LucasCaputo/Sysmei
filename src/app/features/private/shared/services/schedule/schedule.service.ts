import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ScheduleRepository } from 'src/app/repository/services/schedule/schedule.repository';
import { ScheduleResponse } from 'src/app/repository/intefaces/schedule-response';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  schedule!: Array<ScheduleResponse>;

  public $schedule: BehaviorSubject<Array<ScheduleResponse>> =
    new BehaviorSubject<Array<ScheduleResponse>>([]);

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private ScheduleRepository: ScheduleRepository
  ) {}

  /** Busca lista de usuários e salva na variável customers */
  public searchScheduleList(user: string): void {
    this.ScheduleRepository.getSchedule().subscribe((scheduleList) => {
      this.schedule = scheduleList;
      this.$schedule.next(scheduleList);
    });
  }

  /**Retorna observable dos agendamentos */

  public scheduleObservable(): Observable<Array<ScheduleResponse>> {
    return this.$schedule.asObservable();
  }

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
