import { Component, Input, OnInit } from '@angular/core';
import { CardInfo } from '../../interfaces/card-info';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedPipesModule } from 'src/app/shared/shared-pipes.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedPipesModule]
})
export class ContactInfoComponent implements OnInit {
  @Input() info: CardInfo | undefined;

  constructor() { }

  ngOnInit(): void { }
}
