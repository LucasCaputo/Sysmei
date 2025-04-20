import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-erro404',
  templateUrl: './erro404.component.html',
  styleUrls: ['./erro404.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class Erro404Component implements OnInit {
  birds: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generateBirds();
  }

  generateBirds() {
    for (let i = 1; i <= 3; i++) {
      this.birds.push({ id: i });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
