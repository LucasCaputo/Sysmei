import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedPipesModule } from 'src/app/shared/shared-pipes.module';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedPipesModule]

})
export class BadgeComponent implements OnInit {
  @Input() name: string = '';

  constructor() { }

  ngOnInit(): void { }
}
