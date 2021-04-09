import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { LoginService } from 'src/app/views/public/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../app.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    usuario: ['', [Validators.email]],
    senha: [''],
  });

  type = 'password';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.postLogin(this.loginForm.value).subscribe(
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
