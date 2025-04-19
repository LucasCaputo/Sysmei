import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
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
    nome: [this.data.nome || '', [Validators.required]],
    telefone: [this.data.telefone || '', [Validators.required]],
    login_usuario: '',
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: EmployeeResponse,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
  ) {}

  saveEmployee() {
    if (this.form.valid && this.form.value.nome && this.form.value.telefone) {
      this.form.controls.login_usuario.setValue(
        this.authService.getUser()!.login,
      );
      const payload = this.form.value as EmployeeResponse;
      if (!this.data.id) {
        this.employeeService.postEmployee(payload).subscribe();
      } else {
        this.employeeService
          .editEmployee({ ...payload, id: this.data.id })
          .subscribe();
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
        this.employeeService.deleteEmployee(employee).subscribe(() => {
          this.dialog.closeAll();
        });
      }
    });
  }
}
