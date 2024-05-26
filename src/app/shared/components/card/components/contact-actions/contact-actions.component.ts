import { Component, Input, OnInit } from '@angular/core';
import { CardInfo } from '../../interfaces/card-info';

@Component({
  selector: 'app-contact-actions',
  templateUrl: './contact-actions.component.html',
  styleUrls: ['./contact-actions.component.scss'],
})
export class ContactActionsComponent implements OnInit {
  @Input() customer!: CardInfo;

  constructor() {}

  ngOnInit(): void {}

  openDialog(param: any) {}
}
