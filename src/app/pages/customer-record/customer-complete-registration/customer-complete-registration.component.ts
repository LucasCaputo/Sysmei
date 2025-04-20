import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';
import { CustomerRepository } from 'src/app/shared/service-api/customer.repository';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-customer-complete-registration',
  templateUrl: './customer-complete-registration.component.html',
  styleUrls: ['./customer-complete-registration.component.scss'],
  standalone: true,
  imports: [SharedModule, MatListModule, SharedInputModule],
})
export class CustomerCompleteRegistrationComponent implements OnInit {
  @Input() data: any | undefined;
  profileForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private auth: AuthService,
    private customerRepository: CustomerRepository,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      ...this.getInitialFormValues(),
      nome: [this.data?.nome || undefined, [Validators.required]],
      telefone1: [this.data?.telefone1 || undefined, [Validators.required]],
      email: [this.data?.email || undefined, [Validators.email]],
      nascimento: [this.formatDateInput(this.data?.nascimento), [this.completDateValidator()]],
    });
  }

  public onSave(): void {
    const birthday = this.formatBackendDate(this.profileForm.value.nascimento);
    if (this.profileForm?.value.id) {
      this.customerRepository.updateCustomer({ ...this.profileForm.value, nascimento: birthday }, this.profileForm.value.id).subscribe(
        (response: any) => {
          this.snackbarService.openSnackBar(`Parabéns! usuário ${this.profileForm.value.nome.toUpperCase()} atualizado com sucesso`, 'X', false);
        },
        (error: any) => {
          this.snackbarService.openSnackBar(`Tivemos um erro na atualização, tente novamente`, 'X', true);
          console.error(error);
        },
      );
    }
  }

  public clearForm(): void {
    this.profileForm.reset(this.getInitialFormValues());
  }

  private getInitialFormValues() {
    return {
      id: this.data?.id || undefined,
      nome: this.data?.nome || undefined,
      socialName: this.data?.socialName || undefined,
      telefone1: this.data?.telefone1 || undefined,
      telefone2: this.data?.telefone2 || undefined,
      email: this.data?.email || undefined,
      ocupacao: this.data?.ocupacao || undefined,
      nascimento: this.formatDateInput(this.data?.nascimento) || undefined,
      indicacao: this.data?.indicacao || undefined,
      endereco: this.data?.endereco || undefined,
      login_usuario: this.auth.getUser()?.login,
    };
  }

  private formatBackendDate(data: string): string {
    if (!data || data.length !== 8) return '';

    const dia = data.substring(0, 2);
    const mes = data.substring(2, 4);
    const ano = data.substring(4, 8);

    return `${ano}-${mes}-${dia}`;
  }

  private formatDateInput(data: string): string {
    if (!data || data.length !== 10) return '';

    const [ano, mes, dia] = data.split('-');
    return `${dia}${mes}${ano}`;
  }

  private completDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value.length === 8 || value.length === 0 ? null : { invalidFormat: true };
    };
  }
}
