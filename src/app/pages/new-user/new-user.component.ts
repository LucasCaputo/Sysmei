import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CardContainerComponent } from 'src/app/shared/components/card-container/card-container.component';
import { MessageTipComponent } from 'src/app/shared/components/message-tip/message-tip.component';
import { NgxMaskDirective } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({ opacity: 0.5 }),
        animate('400ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    HeaderComponent,
    CardContainerComponent,
    MessageTipComponent,
    NgxMaskDirective,
    MatIconModule,
    MatButtonModule,
  ],
})
export class NewUserComponent {
  profileForm = this.fb.group({
    telefone: [''],
    login: ['', [Validators.email]],
    nome: ['', this.checkName],
    senha: [''],
    confirmarSenha: [''],
  });

  type = 'password';

  isOpen = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: UntypedFormBuilder,
  ) { }

  checkName(input: UntypedFormControl) {
    const hasNumber = /[0-9]/.test(input.value);

    if (hasNumber) return { hasNumber: true };
    else {
      const name = input.value.split(' ');

      const filtrado = name.filter((x: string) => {
        if (x != '' && x.length > 1) return { isNameComplete: true };

        return null;
      });

      return filtrado.length < 2 ? { isNameComplete: true } : null;
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.postUser(this.profileForm.value).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Parabéns! usuário ${this.profileForm.value.nome} cadastrado com sucesso, faça login`,
            'X',
            false,
          );
          this.router.navigate(['/login']);
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

  confirmPassword() {
    if (
      this.profileForm.value.senha !== this.profileForm.value.confirmarSenha &&
      this.profileForm.value.senha.length >= 6 &&
      this.profileForm.value.confirmarSenha.length >= 6
    ) {
      this.profileForm.controls.confirmarSenha.setErrors({
        passwordNotEqual: true,
      });
    }
  }
}
