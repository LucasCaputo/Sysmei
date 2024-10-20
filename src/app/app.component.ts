import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  showMenu: boolean = false;

  ngOnInit(): void {
    this.checkNotificationPermission();
  }

  checkNotificationPermission() {
    if ('Notification' in window && navigator.serviceWorker) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.scheduleDailyNotification();
        }
      });
    }
  }

  async scheduleDailyNotification() {
    const registration = await navigator.serviceWorker.ready;
    const time = new Date();
    time.setHours(9, 0, 0, 0); // 9:00 AM

    const interval = 24 * 60 * 60 * 1000; // 24 hours

    setInterval(() => {
      registration.showNotification('Bom Dia!', {
        body: 'Desejamos a você um ótimo dia!',
      });
    }, interval);
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.activatedRoute.root.firstChild;
      if (currentRoute && currentRoute.snapshot.data['withMenu']) {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
    });
  }


}
