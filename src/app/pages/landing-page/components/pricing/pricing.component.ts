import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  isAnnual: boolean = true;
  bannerOpen: boolean = true;

  togglePricing() {
    this.isAnnual = !this.isAnnual;
  };

  closeBanner() {
    this.bannerOpen = !this.bannerOpen;
  }
}
