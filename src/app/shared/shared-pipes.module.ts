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
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { IconColorPipe } from './pipes/icon-color.pipe';
import { IconCustomerPipe } from './pipes/icon-customer.pipe';

@NgModule({
  declarations: [
    ArrayFiltroPipe,
    FormatPhonePipe,
    IconColorPipe,
    IconCustomerPipe,
  ],
  exports: [
    ArrayFiltroPipe,
    FormatPhonePipe,
    IconColorPipe,
    IconCustomerPipe,
  ],
})
export class SharedPipesModule { }
