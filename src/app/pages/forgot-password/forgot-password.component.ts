import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CardContainerComponent } from 'src/app/shared/components/card-container/card-container.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';
import { MessageTipComponent } from 'src/app/shared/components/message-tip/message-tip.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user/user.service';
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
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {}

  onSubmit() {
    if ( this.forgotPassword.value.email ) {
      this.userService.forgotPassword(this.forgotPassword.value.email).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
           response,
            'X',
            false,
          );
        }
      );
    } else {
      this.snackbarService.openSnackBar(
        'E-mail não encontrado.',
        'X',
        true,
      );
    };
  };

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
