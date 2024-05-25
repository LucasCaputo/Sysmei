import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UserService } from '../../shared/services/user/user.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { CardContainerComponent } from '../../shared/components/card-container/card-container.component';
import { LoginRequest } from '../../shared/interfaces/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../../app.component.scss'],
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
    MatCardModule,
    HeaderComponent,
    LoginFormComponent,
    CardContainerComponent
  ]
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {}

  onSubmit(event: LoginRequest) {
    if (event) {
      this.userService.postLogin(event).subscribe(
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
