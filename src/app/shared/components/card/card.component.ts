import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BadgeComponent } from './components/badge/badge.component';
import { ContactActionsComponent } from './components/contact-actions/contact-actions.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { CardInfo } from './interfaces/card-info';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, BadgeComponent, ContactActionsComponent, ContactInfoComponent],
})
export class CardComponent {
  @Output() edit = new EventEmitter();
  @Output() click = new EventEmitter();

  @Input() cardData!: CardInfo;
  @Input() showEdit: boolean = true;

  openDialog() {
    this.edit.emit(this.cardData);
  }

  onClick() {
    this.click.emit(this.cardData);
  }
}
