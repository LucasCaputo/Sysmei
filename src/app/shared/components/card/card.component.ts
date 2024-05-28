import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardInfo } from './interfaces/card-info';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../../shared.module';
import { BadgeComponent } from './components/badge/badge.component';
import { ContactActionsComponent } from './components/contact-actions/contact-actions.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, MatListModule, BadgeComponent, ContactActionsComponent, ContactInfoComponent]
})
export class CardComponent implements OnInit {
  @Output() edit = new EventEmitter();

  @Input() cardData!: CardInfo;

  ngOnInit(): void { }

  openDialog() {
    this.edit.emit(this.cardData)
  }
}
