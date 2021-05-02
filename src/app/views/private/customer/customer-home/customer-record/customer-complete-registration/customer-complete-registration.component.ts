import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CustomerResponse } from '../../../customer.interface';
import { CustomerService } from '../../../customer.service';

@Component({
  selector: 'app-customer-complete-registration',
  templateUrl: './customer-complete-registration.component.html',
  styleUrls: ['./customer-complete-registration.component.scss'],
})
export class CustomerCompleteRegistrationComponent implements OnInit {
  eventsSubscription: Subscription | undefined;

  @Input() data: CustomerResponse | undefined;
  @Input() edit: boolean | undefined;
  @Input() events!: Observable<void>;
  profileForm: any;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private auth: AuthService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
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
      this.customerService
        .updateCustomer(this.profileForm.value, this.profileForm.value.id)
        .subscribe(
          (response: any) => {
            this.snackbarService.openSnackBar(
              `Parabéns! usuário ${this.profileForm.value.nome.toUpperCase()} atualizado com sucesso`,
              'X',
              false
            );
            console.log(response);
          },
          (error: any) => {
            this.snackbarService.openSnackBar(
              `Tivemos um erro na atualização, tente novamente`,
              'X',
              true
            );
            console.log(error);
          }
        );
    }
  }

  ngOnDestroy() {
    this.eventsSubscription?.unsubscribe();
  }

  onSubmit() {
    console.log('submit');
  }

  update(form: FormGroup) {
    if (form.status == 'INVALID') {
      this.snackbarService.openSnackBar('Erro ao atualizar', 'x', true);
    } else {
      this.snackbarService.openSnackBar('Atualizado', 'x', false);
    }

    console.log(form);
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
