import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, MatToolbarModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  imageUrl = '/src/assets/images/logo.svg';

  isMenuOpen: boolean = false;
  activeLink: string | null = null;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  };

  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
