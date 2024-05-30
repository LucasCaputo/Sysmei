import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CustomerDialogComponent implements OnInit {
  form = this.fb.group({
    id: [this.data.id || null],
    nome: [this.data.nome || '', this.checkName],
    telefone1: [this.data.telefone1 || ''],
    email: [this.data.email || '', [Validators.email]],
    login_usuario: [this.authService.getUser()?.login],
  });

  user = this.authService.getUser();

  @ViewChild('myInput') myInput: ElementRef | undefined;

  constructor(
    private authService: AuthService,
    private fb: UntypedFormBuilder,
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
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.myInput?.nativeElement.focus();
    }, 300);
  }

  checkName(input: UntypedFormControl) {
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

  onDelete(customer: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        confirmed: false,
      },
      position: {
        top: '70px'
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

  /**Adiciona e edita dados do Customer */
  saveCustomer(): void {
    if (this.form.value?.id) {
      this.customerService
        .updateCustomer(this.form.value, this.form.value.id)
        .subscribe(
          (response) => {
            this.customerService.searchCustomerList();
            this.snackbarService.openSnackBar(
              `Parabéns! usuário ${this.form.value.nome.toUpperCase()} atualizado com sucesso`,
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
      return;
    }
    if (this.form.value) {
      this.customerService.postCustomer(this.form.value).subscribe(
        (response) => {
          this.customerService.searchCustomerList();
          this.snackbarService.openSnackBar(
            `Parabéns! usuário ${this.form.value.nome.toUpperCase()} cadastrado com sucesso`,
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
  }
}
