import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { LoginService } from 'src/app/views/public/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../app.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario = '';
  senha = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.loginService.postLogin(form.form.value).subscribe(
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
