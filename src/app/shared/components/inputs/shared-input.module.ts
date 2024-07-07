import { NgModule } from '@angular/core';
import { ActionButtonsComponent } from '../dialogs/components/action-buttons/action-buttons.component';
import { MobileActionButtonsComponent } from '../dialogs/components/mobile-action-buttons/mobile-action-buttons.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';
import { PhoneComponent } from './phone/phone.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    NameComponent,
    PhoneComponent,
    EmailComponent,
    PasswordComponent,
    MobileActionButtonsComponent,
    ActionButtonsComponent,
    SearchComponent
  ],
  exports: [
    NameComponent,
    PhoneComponent,
    EmailComponent,
    PasswordComponent,
    MobileActionButtonsComponent,
    ActionButtonsComponent,
    SearchComponent
  ]
})
export class SharedInputModule { }
