import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDialogComponent } from './customer-dialog.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { SharedModule } from 'src/app/shared/shared.module';
// import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CustomerDialogComponent],
  imports: [CommonModule, MatFormFieldModule, SharedModule,
    //  NgxMaskModule.forRoot()
    ],
  exports: [CustomerDialogComponent],
})
export class CustomerDialogModule {}
