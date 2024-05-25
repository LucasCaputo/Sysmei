import { Component, Input, OnInit } from '@angular/core';
import { CardInfo } from '../../interfaces/card-info';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit {
  @Input() info: CardInfo | undefined;

  constructor() {}

  ngOnInit(): void {    
  }
}
