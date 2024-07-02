import { NgModule } from '@angular/core';
import { NameComponent } from './name/name.component';
import { PhoneComponent } from './phone/phone.component';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  imports: [
    NameComponent,
    PhoneComponent,
    EmailComponent,
    PasswordComponent
  ],
  exports: [
    NameComponent,
    PhoneComponent,
    EmailComponent,
    PasswordComponent
  ]
})
export class SharedInputModule { }
