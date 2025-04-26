import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public cache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  public createCacheKey(endpoint: string, params: any): string {
    return endpoint + JSON.stringify(params);
  }

  public clearAllCache(): void {
    this.cache = {};
  }
}
