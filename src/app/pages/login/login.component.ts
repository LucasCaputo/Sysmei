import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CardContainerComponent } from 'src/app/shared/components/card-container/card-container.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';
import { MessageTipComponent } from 'src/app/shared/components/message-tip/message-tip.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { FormatLoginPayload } from 'src/app/shared/services/utils/format-login-payload';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    SharedInputModule,
    MatCardModule,
    HeaderComponent,
    CardContainerComponent,
    MessageTipComponent,
  ],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly formBuilder: FormBuilder,
  ) {}

  checkNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            console.error('Permissão aceita para notificações.');
            const notification = new Notification('Hi There', {
              body: 'Está é uma notificação',
            });

            notification.onclick = () => {
              console.log('Notificação clicada!');
            };
          }
        })
        .catch((error) => {
          console.error(
            'Erro ao solicitar permissão para notificações:',
            error,
          );
        });
    } else {
      console.error('Este navegador não suporta notificações.');
    }
  }

  onSubmit() {
    if (
      this.loginForm.value.email &&
      this.loginForm.value.password &&
      this.loginForm.valid
    ) {
      const payload = FormatLoginPayload(this.loginForm.value);

      this.userService.postLogin(payload).subscribe(
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
          console.error(error);
        },
      );
    }
  }
}
