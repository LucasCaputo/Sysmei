import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { BadgeComponent } from './components/badge/badge.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { ContactActionsComponent } from './components/contact-actions/contact-actions.component';

@NgModule({
  declarations: [
    CardComponent,
    BadgeComponent,
    ContactInfoComponent,
    ContactActionsComponent,
  ],
  imports: [CommonModule, SharedModule, MatListModule],
  exports: [CardComponent],
})
export class CardModule {}
