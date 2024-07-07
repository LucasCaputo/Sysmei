import {
  Component,
  Inject
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeResponse } from '../../../interfaces/employee-response';
import { SharedInputModule } from '../../inputs/shared-input.module';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
  standalone: true,
  imports: [SharedModule, SharedInputModule],
})
export class EmployeeDialogComponent {
  form = this.formBuilder.group({
    login_usuario: '',
    nome: [this.data.nome || '', [Validators.required]],
    telefone: [this.data.telefone || '', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      login_usuario: string;
      nome: string;
      telefone: string;
    },
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
  ) {}

  saveEmployee() {
    if (this.form.valid && this.form.value.nome && this.form.value.telefone) {
      this.form.controls.login_usuario.setValue(this.authService.getUser()!.login)
      const payload = this.form.value as EmployeeResponse
      if(!this.data.id) {
        this.employeeService.postEmployee(payload).subscribe(
          (response) => {
            this.snackbarService.openSnackBar(
              `Parabéns! Prestador ${this.form.value.nome} cadastrado com sucesso!`,
              'X',
              false,
            );
            this.employeeService.searchEmployeeList();
          },
          (error) => {
            this.snackbarService.openSnackBar(
              `Tente novamente ( ${error.error}) `,
              'X',
              true,
            );
            console.log(error);
          },
        );
      } else {
        this.employeeService.editEmployee({...payload, id: this.data.id}).subscribe(
          (response) => {
            this.snackbarService.openSnackBar(
              `Parabéns! Prestador ${this.form.value.nome} atualizado com sucesso!`,
              'X',
              false,
            );
            this.employeeService.searchEmployeeList();
          },
          (error) => {
            this.snackbarService.openSnackBar(
              `Tente novamente ( ${error.error}) `,
              'X',
              true,
            );
            console.log(error);
          },
        )
      }
    }
  }

  onDelete(employee: any) {
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
        this.employeeService.deleteEmployee(employee).subscribe(
          (response) => {
            this.snackbarService.openSnackBar(
              `Prestador deletado com sucesso`,
              'X',
              false,
            );

            this.employeeService.searchEmployeeList();
            this.dialog.closeAll();
          },
          (error) => {
            console.log(error);
            this.snackbarService.openSnackBar(
              `Tivemos um erro, tente novamente`,
              'X',
              true,
            );
          },
        );
      }
    });
  }
}
