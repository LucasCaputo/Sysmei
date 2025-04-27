import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ScheduleResponse } from '../interfaces/schedule-response';
import { CacheService } from './cache';

@Injectable({
  providedIn: 'root',
})
export class ScheduleRepository {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private cacheService: CacheService,
  ) {}

  public postScheduling(scheduling: any): Observable<any> {
    this.cacheService.clearCache();
    return this.httpClient.post<any>(environment.baseURL + '/agenda', scheduling);
  }

  public getScheduleByDate(startDate: string, endDate: string): Observable<ScheduleResponse[]> {
    const endpoint = `${environment.baseURL}/agenda/prestador`;
    const params = `?dataInicio=${startDate}&dataFim=${endDate}&prestadorId=all`;

    const cacheKey = this.cacheService.createCacheKey(endpoint, params);

    if (this.cacheService.cache[cacheKey]) {
      return of(this.cacheService.cache[cacheKey]);
    }

    return this.httpClient.get<any>(endpoint + params).pipe(tap((schedule) => (this.cacheService.cache[cacheKey] = schedule)));
  }

  public deleteScheduling(customerId: any): Observable<any> {
    this.cacheService.clearCache();
    return this.httpClient.delete<any>(`${environment.baseURL}/agenda/${customerId}`);
  }

  public updateScheduling(body: any, id: number) {
    this.cacheService.clearCache();
    return this.httpClient.put(environment.baseURL + '/agenda/' + id, body, {
      headers: {
        Authorization: this.authService.getToken()!,
        PacienteID: `${body.paciente_id}`,
        PrestadorID: `${body.prestador_id}`,
      },
    });
  }

  public patchStatus(body: { status: number }, id: number) {
    this.cacheService.clearCache();
    return this.httpClient.patch(environment.baseURL + '/agenda/' + id + '/status', body);
  }
}
