import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/views/public/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../app.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario = '';
  senha = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.loginService.postLogin(form.form.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/agenda']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
