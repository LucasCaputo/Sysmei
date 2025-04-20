import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  services = [
    {
      name: 'Salão de Beleza',
      description: 'Serviço de corte de cabelo masculino e feminino, realizado por profissionais qualificados.',
      image: 'assets/images-landing-page/salao-beleza.jpg',
    },
    {
      name: 'Manicure e Pedicure',
      description: 'Tratamento completo para unhas, incluindo esmaltação e cuidados especiais.',
      image: 'assets/images-landing-page/manicure.jpg',
    },
    {
      name: 'Massagem Relaxante',
      description: 'Sessões de massagem para relaxamento e alívio de estresse.',
      image: 'assets/images-landing-page/massagem.jpg',
    },
    {
      name: 'Limpeza de Pele',
      description: 'Limpeza facial profunda para rejuvenescimento da pele.',
      image: 'assets/images-landing-page/limpeza-pele.jpg',
    },
    {
      name: 'Clínica Odontológica',
      description: 'Serviço de depilação utilizando técnicas variadas, para conforto e eficácia.',
      image: 'assets/images-landing-page/clinica-odonto.jpg',
    },
    {
      name: 'Design de Sobrancelhas',
      description: 'Modelagem e cuidados especiais para deixar suas sobrancelhas impecáveis.',
      image: 'assets/images-landing-page/design-sobrancelha.jpg',
    },
  ];
}
