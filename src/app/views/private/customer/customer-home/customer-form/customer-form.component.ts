import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerForm = this.fb.group({
    nome: [this.data.nome || '', this.checkName],
    telefone1: [this.data.telefones[0].numero || ''],
    email: [this.data.email || '', [Validators.email]],
    login_usuario: [this.authService.getUser()?.login],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      nome: string;
      email: string;
      telefones: Array<{ id: number; numero: string }>;
    }
  ) {}

  ngOnInit(): void {}

  checkName(input: FormControl) {
    const hasNumber = /[0-9]/.test(input.value);

    if (hasNumber) return { hasNumber: true };
    else {
      const name = input.value.split(' ');

      const filtrado = name.filter((x: string) => {
        if (x != '' && x.length > 1) return { isNameComplete: true };

        return null;
      });

      return filtrado.length < 2 ? { isNameComplete: true } : null;
    }
  }
}
