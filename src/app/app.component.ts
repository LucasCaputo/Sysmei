import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <app-loader></app-loader> <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    localStorage.removeItem('customer');
    localStorage.removeItem('scheduling');
  }
}
