import { NgModule } from '@angular/core';
import { NameComponent } from './name/name.component';
import { PhoneComponent } from './phone/phone.component';
import { EmailComponent } from './email/email.component';

@NgModule({
  imports: [
    NameComponent,
    PhoneComponent,
    EmailComponent
  ],
  exports: [
    NameComponent,
    PhoneComponent,
    EmailComponent
  ]
})
export class SharedInputModule { }
