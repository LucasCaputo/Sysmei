import {
  Component,
  Inject
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedInputModule } from '../../inputs/shared-input.module';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss'],
  standalone: true,
  imports: [SharedModule, SharedInputModule],
})
export class CustomerDialogComponent {
  form = this.formBuilder.group({
    id: [this.data.id || null],
    nome: [this.data.nome || '', [Validators.required]],
    telefone1: [this.data.telefone1 || '', [Validators.required]],
    email: [this.data.email || '', [Validators.email]],
    login_usuario: [this.authService.getUser()?.login],
  });

  user = this.authService.getUser();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      nome: string;
      email: string;
      telefone1: string;
    },
    private customerService: CustomerService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
  ) {}

  saveCustomer(): void {
    if (this.form.value && this.form.value.id) {
      this.updateCustomer(this.form.value.id);
      return;
    }
    if (this.form.value) {
      this.addCustomer();
    }
  }

  updateCustomer(id: number) {
    this.customerService
    .updateCustomer(this.form.value, id)
    .subscribe(
      (response) => {
        this.customerService.searchCustomerList();
        this.snackbarService.openSnackBar(
          `Parabéns! usuário atualizado com sucesso`,
          'X',
          false,
        );
      },
      (error) => {
        this.snackbarService.openSnackBar(
          `Tivemos um erro na atualização, tente novamente`,
          'X',
          true,
        );
      },
    );
  }

  addCustomer() {
    this.customerService.postCustomer(this.form.value).subscribe(
      (response) => {
        this.customerService.searchCustomerList();
        this.snackbarService.openSnackBar(
          `Parabéns! cliente cadastrado com sucesso`,
          'X',
          false,
        );
      },
      (error) => {
        this.snackbarService.openSnackBar(
          `Tivemos um erro no cadastro, tente novamente`,
          'X',
          true,
        );
      },
    );
  }

  onDelete(customer: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: {
        confirmed: false,
      },
      position: {
        top: '90px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.customerService.deleteCustomer(customer).subscribe(
          (response) => {
            this.snackbarService.openSnackBar(
              `Usuário deletado com sucesso`,
              'X',
              false,
            );

            this.customerService.searchCustomerList();

            this.dialog.closeAll();
          },
          (error) => {
            console.log(error);
            this.snackbarService.openSnackBar(
              `Tivemos um erro no cadastro, tente novamente`,
              'X',
              true,
            );
          },
        );
      }
    });
  }
}
