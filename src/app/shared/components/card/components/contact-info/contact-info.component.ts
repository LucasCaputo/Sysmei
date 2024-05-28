import { Component, Input, OnInit } from '@angular/core';
import { CardInfo } from '../../interfaces/card-info';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ContactInfoComponent implements OnInit {
  @Input() info: CardInfo | undefined;

  constructor() { }

  ngOnInit(): void { }
}
