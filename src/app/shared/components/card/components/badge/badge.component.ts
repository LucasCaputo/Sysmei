import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
  imports: [ SharedModule]

})
export class BadgeComponent implements OnInit {
  @Input() name: string = '';

  constructor() {}

  ngOnInit(): void {}
}
