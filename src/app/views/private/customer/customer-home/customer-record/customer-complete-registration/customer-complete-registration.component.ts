import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerResponse } from '../../../customer.interface';

@Component({
  selector: 'app-customer-complete-registration',
  templateUrl: './customer-complete-registration.component.html',
  styleUrls: ['./customer-complete-registration.component.scss'],
})
export class CustomerCompleteRegistrationComponent implements OnInit {
  @Input() data: CustomerResponse | undefined;

  profileForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [this.data?.id || undefined],

      nome: [this.data?.nome || ''],
      pseudonimo: [this.data?.pseudonimo || ''],

      telefone1: [this.data?.telefone1 || ''],
      telefone2: [this.data?.telefone2 || ''],
      email: [this.data?.email || '', [Validators.email]],

      ocupacao: [this.data?.ocupacao || ''],
      telefone3: [this.data?.telefone3 || ''],

      nascimento: [this.data?.nascimento || ''],
      indicacao: [this.data?.indicacao || ''],
      sexo: [this.data?.nascimento || ''],
      estadoCivil: [this.data?.estadoCivil || ''],

      endereco: [this.data?.endereco || ''],
      enderecoNum: [this.data?.enderecoNum || ''],
      bairro: [this.data?.bairro || ''],
      cidade: [this.data?.cidade || ''],
      estado: [this.data?.estado || ''],
      cep: [this.data?.cep || ''],

      rg: [this.data?.rg || ''],
      cpf: [this.data?.cpf || ''],
      responsavel: [this.data?.telefone3 || ''],
      planoSaude: [this.data?.planoSaude || ''],
      convenio: [this.data?.convenio || ''],
    });
  }

  onSubmit() {
    console.log('submit');
  }
}
