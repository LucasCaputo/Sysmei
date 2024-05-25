import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { WhatsappIconComponent } from './components/whatsapp-icon/whatsapp-icon.component';
import { ArrayFiltroPipe } from './pipes/array-filtro.pipe';
import { FormatPhonePipe } from './pipes/format-phone.pipe';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
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
