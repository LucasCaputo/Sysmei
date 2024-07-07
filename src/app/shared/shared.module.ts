import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    NgxMaskDirective,
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    NgxMaskDirective,
    SpinnerComponent
  ],
})
export class SharedModule {}
