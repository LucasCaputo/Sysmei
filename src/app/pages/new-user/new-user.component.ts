import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CardContainerComponent } from 'src/app/shared/components/card-container/card-container.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';
import { MessageTipComponent } from 'src/app/shared/components/message-tip/message-tip.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { FormatLoginPayload, FormatNewUserPayload } from 'src/app/shared/services/utils/format-payload';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    SharedInputModule,
    MatCardModule,
    MatInputModule,
    HeaderComponent,
    CardContainerComponent,
    MessageTipComponent,
  ],
})
export class NewUserComponent {
  profileForm = this.formBuilder.group({
    phone: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
  ) {}

  onSubmit() {
    if (
      this.profileForm.value.password !== this.profileForm.value.confirmPassword
    ) {
      this.profileForm.controls.confirmPassword.setErrors({
        passwordNotEqual: true,
      });

      return
    }

    if (this.profileForm.valid) {
      const payload = FormatNewUserPayload(this.profileForm.value)
      this.userService.postUser(payload).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Parabéns! usuário ${response.nome} cadastrado, realizando login`,
            'X',
            false,
          );
          const loginPayload = FormatLoginPayload(this.profileForm.value)
          this.userService.postLogin(loginPayload).subscribe(()=> {
            this.router.navigate(['/agenda']);
          })
        },
        (error) => {
          this.snackbarService.openSnackBar(
            `Tente novamente ( ${error.error}) `,
            'X',
            true,
          );
          console.log(error);
        },
      );
    }
  }
}
