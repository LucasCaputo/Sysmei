import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDialogComponent } from './customer-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CustomerDialogComponent],
  imports: [CommonModule, MatFormFieldModule, SharedModule, NgxMaskModule.forRoot()],
  exports: [CustomerDialogComponent],
})
export class CustomerDialogModule {}
