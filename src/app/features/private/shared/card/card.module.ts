import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { BadgeComponent } from './components/badge/badge.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

@NgModule({
  declarations: [CardComponent, BadgeComponent, ContactInfoComponent],
  imports: [CommonModule, SharedModule, MatListModule],
  exports: [CardComponent],
})
export class CardModule {}
