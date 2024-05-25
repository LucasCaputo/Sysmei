import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WhatsappIconComponent } from './components/whatsapp-icon/whatsapp-icon.component';
import { ArrayFiltroPipe } from './pipes/array-filtro.pipe';
import { FormatPhonePipe } from './pipes/format-phone.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { IconColorPipe } from './pipes/icon-color.pipe';
import { IconCustomerPipe } from './pipes/icon-customer.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],

  declarations: [
    ConfirmDialogComponent,
    WhatsappIconComponent,
    ArrayFiltroPipe,
    FormatPhonePipe,
    IconColorPipe,
    IconCustomerPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    ConfirmDialogComponent,
    WhatsappIconComponent,
    RouterModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatProgressBarModule,
    ArrayFiltroPipe,
    FormatPhonePipe,
    MatSnackBarModule,
    IconColorPipe,
    IconCustomerPipe,
  ],
})
export class SharedModule {}
