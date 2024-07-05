import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { checkName } from 'src/app/shared/services/utils/check-name';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogActionButtonsComponent } from '../components/dialog-action-buttons/dialog-action-buttons.component';
import { MobileActionButtonsComponent } from '../components/mobile-action-buttons/mobile-action-buttons.component';
import { SharedInputModule } from '../../inputs/shared-input.module';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [SharedModule, DialogActionButtonsComponent, SharedInputModule, MobileActionButtonsComponent],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  public user = this.authService.getUser();

  public userForm = this.formBuilder.group({
    name: [this.user?.nome || '', [
      Validators.required,
      this.validateName,
    ]],
    phone: this.user?.telefone || '',
    login: [this.user?.login || '', [Validators.email]],
  });

  public passwordForm = this.formBuilder.group({
    oldPassword: '',
    password: '',
    repetPassword: '',
  });

  public removeAccountForm = this.formBuilder.group({
    enabled: true,
    status: true,
  });

  public constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  validateName(input: FormControl) {
    return checkName(input);
  }
}
