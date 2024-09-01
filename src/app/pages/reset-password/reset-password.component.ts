import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';
import { MessageTipComponent } from 'src/app/shared/components/message-tip/message-tip.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardContainerComponent } from "../../shared/components/card-container/card-container.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { PasswordComponent } from "../../shared/components/inputs/password/password.component";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CardContainerComponent,
    HeaderComponent,
    MatCardModule,
    MatInputModule,
    MessageTipComponent,
    PasswordComponent,
    SharedModule,
    SharedInputModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  profileForm = this.formBuilder.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  token = signal('')

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams?.token;
    console.log(token)
    this.token.set(token)
  }

  onSubmit() {

    if(
      this.profileForm.value.password !== this.profileForm.value.confirmPassword || 
      !this.profileForm.value.password
    ) {
      this.profileForm.controls.confirmPassword.setErrors({
        passwordNotEqual: true,
      });

      return
    }

    if(this.profileForm.valid) {
      this.userService.resetPassword(this.token(), this.profileForm.value.password).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Nova senha cadastrada com sucesso!`,
            'X',
            false
          );

          this.router.navigate(['/login'])
        },
        (error) => {
          this.snackbarService.openSnackBar(
            `Tente novamente ( ${error.error}) `,
            'X',
            true,
          );
          console.error(error);
        },
      )
    }
  };

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
