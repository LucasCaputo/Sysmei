import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardInfo } from '../../interfaces/card-info';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-contact-actions',
  templateUrl: './contact-actions.component.html',
  styleUrls: ['./contact-actions.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ContactActionsComponent implements OnInit {
  @Output() edit = new EventEmitter();

  @Input() customer!: CardInfo;

  constructor() { }

  ngOnInit(): void { }

  openDialog() {
    this.edit.emit()
  }
}
