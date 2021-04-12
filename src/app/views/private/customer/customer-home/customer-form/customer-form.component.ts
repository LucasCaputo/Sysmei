import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerForm = this.fb.group({
    nome: [''],
    telefone1: [''],
    email: ['', [Validators.email]],
    login_usuario: [this.authService.getUser()?.login],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}
}
