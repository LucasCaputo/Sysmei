import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WhatsappIconComponent } from '../../../whatsapp-icon/whatsapp-icon.component';
import { CardInfo } from '../../interfaces/card-info';

@Component({
  selector: 'app-contact-actions',
  templateUrl: './contact-actions.component.html',
  styleUrls: ['./contact-actions.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, WhatsappIconComponent]
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
