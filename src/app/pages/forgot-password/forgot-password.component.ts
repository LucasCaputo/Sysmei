import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';
import { CardContainerComponent } from 'src/app/shared/components/card-container/card-container.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';
import { MessageTipComponent } from 'src/app/shared/components/message-tip/message-tip.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { FormatLoginPayload } from 'src/app/shared/services/utils/format-login-payload';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    SharedModule,
    SharedInputModule,
    MatCardModule,
    HeaderComponent,
    CardContainerComponent,
    MessageTipComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isError = signal(false);

  forgotPassword = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]]
  })

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams?.token;

    if(token) {
      this.verifyToken(token);
    } else {
      this.isError.set(true);
    }
  }

  verifyToken(token: string) {
    this.userService.getTokenValidation(token).subscribe((res) => {
      console.log(res)
    })
  }

  onSubmit() {
    if ( this.forgotPassword.value.email ) {
      const payload = FormatLoginPayload(this.forgotPassword.value);

      this.userService.updateUser(payload).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Um link foi enviado para o seu e-mail.`,
            'X',
            false,
          );

          this.router.navigate(['/recuperar-conta']);
        },
        (error) => {
          this.snackbarService.openSnackBar(
            `Erro ao enviar e-mail ( ${error.error}) `,
            'X',
            true,
          );
        },
      );
    } {
      this.snackbarService.openSnackBar(
        'E-mail não encontrado.',
        'X',
        true,
      );
    };
    (error: any) => {
      this.snackbarService.openSnackBar(
        `Erro ao verificar e-mail: ${error.error}`,
        'X',
        true,
      );
      console.error(error);
    }
  };

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
