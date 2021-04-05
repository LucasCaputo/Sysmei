import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
// import { Scheduling } from '../../../shared/interfaces/scheduling.interface';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public postScheduling(scheduling: any): Observable<any> {
    console.log(scheduling);

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
}
