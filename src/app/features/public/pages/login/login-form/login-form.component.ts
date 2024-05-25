import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MessageTipComponent } from '../../../shared/components/message-tip/message-tip.component';
import { LoginRequest } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MessageTipComponent]
})
export class LoginFormComponent {
  @Output() action = new EventEmitter<LoginRequest>();

  constructor(private readonly formGroup: UntypedFormBuilder) { }
  loginForm = this.formGroup.group({
    usuario: ['', [Validators.email]],
    senha: [''],
  });

  type = 'password';

  public onSubmit() {
    this.action.emit(this.loginForm.value);
  }
}
