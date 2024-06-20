import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedPipesModule } from 'src/app/shared/shared-pipes.module';
import { CardInfo } from '../../interfaces/card-info';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedPipesModule],
})
export class ContactInfoComponent implements OnInit {
  @Input() info: CardInfo | undefined;

  constructor() {}

  ngOnInit(): void {}
}
