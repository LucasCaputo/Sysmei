import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements AfterViewInit {
  swiper: Swiper | undefined;

  slides = [
    {
      image:
        'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Consultório Odontológico',
      description:
        'Este sistema de agendamento transformou a rotina do meu consultório. Agora, meus pacientes conseguem marcar suas consultas com facilidade, e o fluxo de trabalho está muito mais organizado.',
      author: '~ Dr. João Silva',
      quoteIcon: './assets/images-landing-page/quote_icon.svg',
    },
    {
      image:
        'https://images.unsplash.com/photo-1680104073088-ad3ef1ba4a1c?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Barbearia',
      description:
        'Desde que adotamos esse sistema, nossos clientes têm adorado a conveniência de agendar seus horários online. Não há mais filas e a barbearia funciona de forma muito mais eficiente!',
      author: '~ Pedro Almeida',
      quoteIcon: './assets/images-landing-page/quote_icon.svg',
    },
    {
      image:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Salão de Beleza',
      description:
        'Nunca foi tão fácil gerenciar os horários dos nossos clientes. O sistema de agendamento nos permite oferecer um serviço mais personalizado e atender a mais clientes sem confusões.',
      author: '~ Ana Beatriz Costa',
      quoteIcon: './assets/images-landing-page/quote_icon.svg',
    },
    {
      image:
        'https://images.unsplash.com/photo-1549247103-4286bd98e366?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Consultório Odontológico',
      description:
        'A capacidade de confirmar e lembrar consultas por meio do sistema reduziu significativamente as faltas. Isso tem melhorado nossa produtividade e satisfação dos pacientes!',
      author: '~ Dra. Carla Monteiro',
      quoteIcon: './assets/images-landing-page/quote_icon.svg',
    },
    {
      image:
        'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Salão de Beleza',
      description:
        'Os agendamentos online trouxeram uma nova era para o nosso salão. Nossos clientes apreciam a flexibilidade de escolher seus horários, e nossa equipe está mais alinhada com as demandas diárias.',
      author: '~ Mariana Rodrigues',
      quoteIcon: './assets/images-landing-page/quote_icon.svg',
    },
  ];

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 2,
      autoplay: {
        delay: 8000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
}
