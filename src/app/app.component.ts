import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
}
