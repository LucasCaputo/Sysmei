import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-erro404',
  templateUrl: './erro404.component.html',
  imports: [SharedModule],
  standalone: true,
  styleUrls: ['./erro404.component.scss'],
})
export class Erro404Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
