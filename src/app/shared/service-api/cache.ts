import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarStateService } from '../services/calendar/calendar-state.service';
import { formatDate } from '../services/utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public cache: { [key: string]: any } = {};

  constructor(
    private readonly calendarStateService: CalendarStateService,
    private readonly route: Router,
  ) {}

  public createCacheKey(endpoint: string, params: any): string {
    return endpoint + JSON.stringify(params);
  }

  public clearAllCache(): void {
    this.cache = {};
  }

  public clearCache(): void {
    const start = formatDate(this.calendarStateService.date.startStr);
    const end = formatDate(this.calendarStateService.date.endStr);

    if (this.route.url.includes('agenda')) {
      const key = 'https://api.sysmei.com/agenda/prestador' + `"?dataInicio=${start}&dataFim=${end}&prestadorId=all"`;
      delete this.cache[key];
    } else {
      this.clearAllCache();
    }
  }
}
