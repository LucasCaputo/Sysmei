import { Component, Input, OnInit } from '@angular/core';
import { CardInfo } from './interfaces/card-info';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cardData!: CardInfo;


  ngOnInit(): void {

    
  }
}
