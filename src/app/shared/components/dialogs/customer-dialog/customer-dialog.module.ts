import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDialogComponent } from './customer-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  declarations: [CustomerDialogComponent],
  imports: [CommonModule, MatFormFieldModule, SharedModule, NgxMaskDirective],
  exports: [CustomerDialogComponent],
})
export class CustomerDialogModule {}
