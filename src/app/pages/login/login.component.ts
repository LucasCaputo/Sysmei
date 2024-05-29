import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginRequest } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CardContainerComponent } from 'src/app/shared/components/card-container/card-container.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../app.component.scss'],
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
    CardContainerComponent,
  ],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) { }

  onSubmit(event: LoginRequest) {
    if (event) {
      this.userService.postLogin(event).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Bem-vindo ${response.usuario.nome}`,
            'X',
            false,
          );
          this.router.navigate(['/agenda']);
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
