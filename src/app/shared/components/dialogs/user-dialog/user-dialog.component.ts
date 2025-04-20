import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { UserInterface } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedInputModule } from '../../inputs/shared-input.module';
import { PaymentsDialogComponent } from '../payments-dialog/payments-dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-dialog',
  standalone: true,
  imports: [SharedModule, SharedInputModule, MatTabsModule, PaymentsDialogComponent],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  public user = this.authService.getUser();

  public userForm = this.formBuilder.group({
    name: [this.user?.nome || '', [Validators.required]],
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
    public dialog: MatDialog,
    public userService: UserService,
  ) {}

  saveSettings() {
    let body: Partial<UserInterface>;

    if (this.userForm.value.name && this.userForm.value.phone && this.userForm.value.login) {
      body = {
        nome: this.userForm.value.name,
        login: this.userForm.value.login,
        telefone: this.userForm.value.phone,
      };

      if (this.passwordForm.value.oldPassword && this.passwordForm.value.password && this.passwordForm.value.repetPassword) {
        body = {
          ...body,
          ...{
            senha: this.passwordForm.value.password,
            senhaAntiga: this.passwordForm.value.oldPassword,
          },
        };
      }
      this.userService.updateUser(body).subscribe();
    }
  }
}
