import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [],
})
export class LoginModule {}
