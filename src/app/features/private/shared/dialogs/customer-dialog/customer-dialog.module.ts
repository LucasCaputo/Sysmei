import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDialogComponent } from './customer-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CustomerDialogComponent],
  imports: [CommonModule, MatFormFieldModule, SharedModule],
  exports: [CustomerDialogComponent],
})
export class CustomerDialogModule {}
