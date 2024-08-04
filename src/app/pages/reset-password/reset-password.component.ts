import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { CardContainerComponent } from "../../shared/components/card-container/card-container.component";
import { PasswordComponent } from "../../shared/components/inputs/password/password.component";
import { UserService } from 'src/app/shared/services/user/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { FormatNewUserPayload } from 'src/app/shared/services/utils/format-new-user-payload';
import { MatInputModule } from '@angular/material/input';
import { MessageTipComponent } from 'src/app/shared/components/message-tip/message-tip.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CardContainerComponent,
    HeaderComponent,
    MatCardModule,
    MatInputModule,
    MessageTipComponent,
    PasswordComponent,
    SharedModule,
    SharedInputModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  profileForm = this.formBuilder.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    token: ['', [Validators.required]]
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder
  ) {}

  isValidToken(token: string): boolean {
    const tokenPattern = /^[a-zA-Z0-9]{10}$/;

    return tokenPattern.test(token)
  }

  onSubmit() {

    if(
      this.profileForm.value.password !== this.profileForm.value.confirmPassword
    ) {
      this.profileForm.controls.confirmPassword.setErrors({
        passwordNotEqual: true,
      });

      return
    }

    if(
      !this.profileForm.value.token || !this.isValidToken(this.profileForm.value.token)
    ) {
      this.profileForm.controls.token.setErrors({
        invalidToken: true,
      })

      return
    }

    if(this.profileForm.valid) {
      const payload = FormatNewUserPayload(this.profileForm.value);

      this.userService.postUser(payload).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Nova senha cadastrada com sucesso!`,
            'X',
            false
          );

          this.router.navigate(['/login'])
        },
        (error) => {
          this.snackbarService.openSnackBar(
            `Tente novamente ( ${error.error}) `,
            'X',
            true,
          );
          console.error(error);
        },
      )
    }
  };

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
