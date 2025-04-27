import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  screenSize$: Observable<string>;
  screenSize = '';

  constructor(private breakpointObserver: BreakpointObserver) {
    this.screenSize$ = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web]).pipe(
      map((state: BreakpointState) => {
        if (state.breakpoints['(max-width: 599.98px) and (orientation: portrait)']) {
          this.screenSize = 'mobile';
          return 'mobile';
        } else if (
          state.breakpoints['(max-width: 959.98px) and (orientation: landscape)'] ||
          state.breakpoints['(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)'] ||
          state.breakpoints['(min-width: 840px) and (orientation: portrait)']
        ) {
          this.screenSize = 'tablet';
          return 'tablet';
        } else if (
          state.breakpoints['(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)'] ||
          state.breakpoints['(min-width: 1280px) and (orientation: landscape)']
        ) {
          this.screenSize = 'web';
          return 'web';
        } else {
          this.screenSize = 'Unknown';
          return 'Unknown';
        }
      }),
    );
  }
}
