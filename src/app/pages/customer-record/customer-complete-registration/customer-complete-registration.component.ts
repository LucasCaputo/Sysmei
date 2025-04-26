import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';
import { CustomerRepository } from 'src/app/shared/service-api/customer.repository';
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
  profileForm!: FormGroup<{
    id: FormControl<string | undefined>;
    nome: FormControl<string>;
    socialName: FormControl<string | undefined>;
    telefone1: FormControl<string>;
    telefone2: FormControl<string>;
    email: FormControl<string>;
    ocupacao: FormControl<string | undefined>;
    nascimento: FormControl<string>;
    indicacao: FormControl<string | undefined>;
    endereco: FormControl<string | undefined>;
  }>;

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private customerRepository: CustomerRepository,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      id: this.formBuilder.control(this.data?.id ?? undefined, { nonNullable: true }),
      nome: this.formBuilder.control(this.data?.nome ?? '', { validators: [Validators.required], nonNullable: true }),
      socialName: this.formBuilder.control(this.data?.socialName ?? undefined),
      telefone1: this.formBuilder.control(this.data?.telefone1 ?? '', { validators: [Validators.required], nonNullable: true }),
      telefone2: this.formBuilder.control(this.data?.telefone2 ?? ''),
      email: this.formBuilder.control(this.data?.email ?? '', { validators: [Validators.email] }),
      ocupacao: this.formBuilder.control(this.data?.ocupacao ?? undefined),
      nascimento: this.formBuilder.control(this.formatDateInput(this.data?.nascimento || ''), {
        validators: [this.completDateValidator()],
        nonNullable: true,
      }),
      indicacao: this.formBuilder.control(this.data?.indicacao ?? undefined),
      endereco: this.formBuilder.control(this.data?.endereco ?? undefined),
    });
  }

  public onSave(): void {
    const birthday = this.formatBackendDate(this.profileForm.value.nascimento || '');
    if (this.profileForm?.value.id) {
      this.customerRepository.updateCustomer({ ...this.profileForm.value, nascimento: birthday }, +this.profileForm.value.id).subscribe(
        (response: any) => {
          this.snackbarService.openSnackBar(`Parabéns! usuário ${this.profileForm?.value?.nome?.toUpperCase()} atualizado com sucesso`, 'X', false);
          this.profileForm.markAsPristine();
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
    this.profileForm.markAsDirty();
  }

  private getInitialFormValues() {
    return {
      id: `${this.data?.id}` || undefined,
      nome: this.data?.nome || undefined,
      socialName: this.data?.socialName || undefined,
      telefone1: this.data?.telefone1 || '',
      telefone2: this.data?.telefone2 || '',
      email: this.data?.email || '',
      ocupacao: this.data?.ocupacao || undefined,
      nascimento: this.formatDateInput(this.data?.nascimento || ''),
      indicacao: this.data?.indicacao || undefined,
      endereco: this.data?.endereco || undefined,
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
      if (value) {
        return value.length === 8 || value.length === 0 ? null : { invalidFormat: true };
      }

      return null;
    };
  }
}
