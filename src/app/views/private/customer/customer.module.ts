import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerFormComponent,
    CustomerMobileComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatListModule,
  ],
  providers: [],
})
export class CustomerModule {}
