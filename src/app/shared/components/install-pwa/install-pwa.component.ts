import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-install-pwa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './install-pwa.component.html',
  styleUrls: ['./install-pwa.component.scss'],
})
export class InstallPwaComponentComponent {
  promptEvent: any;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.promptEvent = event;
  }

  installPwa() {
    this.promptEvent.prompt();
    this.promptEvent.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.promptEvent = null;
    });
  }
}
