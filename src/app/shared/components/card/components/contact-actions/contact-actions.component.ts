import { Component, Input, OnInit } from '@angular/core';
import { CardInfo } from '../../interfaces/card-info';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-contact-actions',
  templateUrl: './contact-actions.component.html',
  styleUrls: ['./contact-actions.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ContactActionsComponent implements OnInit {
  @Input() customer!: CardInfo;

  constructor() { }

  ngOnInit(): void { }

  openDialog(param: any) { }
}
