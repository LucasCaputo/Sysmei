import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erro404',
  templateUrl: './erro404.component.html',
  styleUrls: ['./erro404.component.scss']
})
export class Erro404Component implements OnInit {
  stars1: any[] = [];
  stars2: any[] = [];
  birds: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.generateStars();
    this.generateBirds();
  }

  generateStars() {
    for (let i = 1; i <= 30; i++) {
      this.stars1.push({ id: i });
    }

    for (let i = 1; i <= 30; i++) {
      this.stars2.push({ id: i });
    }
  }

  generateBirds() {
    for (let i = 1; i <= 6; i++) {
      this.birds.push({ id: i });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
