import { NgModule } from '@angular/core';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';
import { PhoneComponent } from './phone/phone.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [NameComponent, PhoneComponent, EmailComponent, PasswordComponent, ActionButtonsComponent, SearchComponent],
  exports: [NameComponent, PhoneComponent, EmailComponent, PasswordComponent, ActionButtonsComponent, SearchComponent],
})
export class SharedInputModule {}
