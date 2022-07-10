import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerRepository } from 'src/app/repository/services/customer/customer.repository';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
})
export class EmployeeDialogComponent implements OnInit {
  form = this.fb.group({
    login_usuario: [this.authService.getUser()?.login],
    nome: [this.data.nome || '', this.checkName],
    telefone: [this.data.telefone || ''],
  });

  user = this.authService.getUser();

  @ViewChild('myInput') myInput: ElementRef | undefined;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      login_usuario: string;
      nome: string;
      telefone: string;
    },
    private customerRepository: CustomerRepository,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
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

  onSubmit() {
    if (this.form.valid) {
      this.employeeService.postEmployee(this.form.value).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Parabéns! Prestador ${this.form.value.nome} cadastrado com sucesso!`,
            'X',
            false
          );
          this.employeeService.searchEmployeeList();
        },
        (error) => {
          this.snackbarService.openSnackBar(
            `Tente novamente ( ${error.error}) `,
            'X',
            true
          );
          console.log(error);
        }
      );
    }
  }

  onDelete(customer: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        confirmed: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.customerRepository.deleteCustomer(customer).subscribe(
          (response) => {
            this.snackbarService.openSnackBar(
              `Usuário deletado com sucesso`,
              'X',
              false
            );

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
