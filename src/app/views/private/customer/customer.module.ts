import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { CustomerFormComponent } from './customer-home/customer-form/customer-form.component';
import { CustomerMobileComponent } from './customer-home/customer-mobile/customer-mobile.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

import { WhatsappIconComponent } from '../../../shared/components/whatsapp-icon/whatsapp-icon.component';

import { NgxMaskModule } from 'ngx-mask';
import { ArrayFiltroPipe } from 'src/app/shared/pipes/array-filtro.pipe';
import { IconCustomerPipe } from 'src/app/shared/pipes/icon-customer.pipe';
import { IconColorPipe } from 'src/app/shared/pipes/icon-color.pipe';
import { FormatPhonePipe } from 'src/app/shared/pipes/format-phone.pipe';
import { ConfirmDialogComponent } from './customer-home/confirm-dialog/confirm-dialog.component';

import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerFormComponent,
    CustomerMobileComponent,
    WhatsappIconComponent,
    ArrayFiltroPipe,
    IconCustomerPipe,
    IconColorPipe,
    FormatPhonePipe,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatListModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
})
export class CustomerModule {}
