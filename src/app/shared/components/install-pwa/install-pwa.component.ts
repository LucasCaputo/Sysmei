import { NgIf } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-install-pwa',
  standalone: true,
  imports: [NgIf, MatButtonModule],
  templateUrl: './install-pwa.component.html',
  styleUrls: ['./install-pwa.component.scss'],
})
export class InstallPwaComponentComponent {
  promptEvent: any;
  public readonly showMessage = signal(true)


  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.promptEvent = event;
  }

  public installPwa(): void {
    this.promptEvent.prompt();
    this.promptEvent.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.warn('User accepted the A2HS prompt');
      } else {
        console.warn('User dismissed the A2HS prompt');
      }
      this.promptEvent = null;
    });
  }

  public closeMessage(): void {
    this.showMessage.set(false)
  }
}
