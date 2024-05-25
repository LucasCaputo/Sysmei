import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewUserRoutingModule } from './new-user-routing.module';
import { NewUserComponent } from './new-user.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [NewUserComponent],
  imports: [
    CommonModule,
    NewUserRoutingModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
  ],
  providers: [],
})
export class NewUserModule {}
