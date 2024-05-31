import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from '../shared/services/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../app.component.scss'],
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({ opacity: 0.5 }),
        animate('400ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  loginForm = this.fb.group({
    usuario: ['', [Validators.email]],
    senha: [''],
  });

  type = 'password';

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.postLogin(this.loginForm.value).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Bem-vindo ${response.usuario.nome}`,
            'X',
            false
          );
          this.router.navigate(['/agenda']);
        },
        (error) => {
          this.snackbarService.openSnackBar(
            `Tente novamente ( ${error.error}) `,
            'X',
            true
          );
          console.log(error);
        }
      );
    }
  }
}
