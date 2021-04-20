import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CustomerService } from '../../customer.service';

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

  user = this.authService.getUser();

  @ViewChild('myInput') myInput: ElementRef | undefined;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      nome: string;
      email: string;
      telefones: Array<{ id: number; numero: string }>;
    },
    private customerService: CustomerService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.myInput?.nativeElement.focus();
    }, 300);
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

  onDelete(customer: any) {
    console.log(customer);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        confirmed: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        console.log(result.confirmed);

        this.customerService.deleteCustomer(customer).subscribe(
          (response) => {
            console.log(response);
            this.snackbarService.openSnackBar(
              `Usuário deletado com sucesso, aguarde que sua lista de clientes será atualizada`,
              'X',
              false
            );

            localStorage.removeItem('customer');
            this.dialog.closeAll();
          },
          (error) => {
            console.log(error);
            this.snackbarService.openSnackBar(
              `Tivemos um erro no cadastro, tente novamente`,
              'X',
              true
            );
          }
        );
      }
    });
  }
}
