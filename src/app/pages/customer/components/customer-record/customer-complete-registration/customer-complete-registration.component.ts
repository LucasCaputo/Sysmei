import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Observable, Subscription } from 'rxjs';
import { CustomerRepository } from 'src/app/repository/services/customer/customer.repository';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-customer-complete-registration',
  templateUrl: './customer-complete-registration.component.html',
  styleUrls: ['./customer-complete-registration.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatListModule, MatIconModule, ReactiveFormsModule, MatInputModule],
})
export class CustomerCompleteRegistrationComponent implements OnInit {
  eventsSubscription: Subscription | undefined;

  @Input() data: any | undefined;
  @Input() edit: boolean | undefined;
  @Input() events!: Observable<void>;
  profileForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private auth: AuthService,
    private customerRepository: CustomerRepository,
  ) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      id: [this.data?.id || undefined],

      nome: [this.data?.nome || undefined, this.checkName],
      socialName: [this.data?.socialName || undefined],

      telefone1: [this.data?.telefone1 || undefined],
      telefone2: [this.data?.telefone2 || undefined],
      email: [this.data?.email || undefined, [Validators.email]],

      ocupacao: [this.data?.ocupacao || undefined],
      telefone3: [this.data?.telefone3 || undefined],

      nascimento: [this.data?.nascimento || undefined],
      indicacao: [this.data?.indicacao || undefined],
      sexo: [this.data?.nascimento || undefined],
      estadoCivil: [this.data?.estadoCivil || undefined],

      endereco: [this.data?.endereco || undefined],
      enderecoNum: [this.data?.enderecoNum || undefined],
      bairro: [this.data?.bairro || undefined],
      cidade: [this.data?.cidade || undefined],
      estado: [this.data?.estado || undefined],
      cep: [this.data?.cep || undefined],

      rg: [this.data?.rg || undefined],
      cpf: [this.data?.cpf || undefined],
      responsavel: [this.data?.telefone3 || undefined],
      planoSaude: [this.data?.planoSaude || undefined],
      convenio: [this.data?.convenio || undefined],
      login_usuario: this.auth.getUser()?.login,
    });

    this.eventsSubscription = this.events.subscribe(() => this.OnSave());
  }

  OnSave() {
    if (this.profileForm?.value.id) {
      this.customerRepository
        .updateCustomer(this.profileForm.value, this.profileForm.value.id)
        .subscribe(
          (response: any) => {
            this.snackbarService.openSnackBar(
              `Parabéns! usuário ${this.profileForm.value.nome.toUpperCase()} atualizado com sucesso`,
              'X',
              false,
            );
            console.log(response);
          },
          (error: any) => {
            this.snackbarService.openSnackBar(
              `Tivemos um erro na atualização, tente novamente`,
              'X',
              true,
            );
            console.log(error);
          },
        );
    }
  }

  ngOnDestroy() {
    this.eventsSubscription?.unsubscribe();
  }

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
