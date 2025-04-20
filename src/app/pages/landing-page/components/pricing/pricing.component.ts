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
  }

  selectedPlan(planNAme: string, price: string) {
    const selectedPlan = {
      name: planNAme,
      price: price,
      billingType: this.isAnnual ? 'Anual' : 'Mensal',
    };

    const wppNumber = '5591984268089';
    const message = `Plano selecionado: ${selectedPlan.name} - R$${selectedPlan.price} - ${selectedPlan.billingType}`;
    const whatsappUrl = `https://wa.me/${wppNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  }
}
