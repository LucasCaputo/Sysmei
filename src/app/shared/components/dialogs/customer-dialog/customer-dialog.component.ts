import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
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
    this.customerService.updateCustomer(this.form.value, id).subscribe();
  }

  addCustomer() {
    this.customerService.postCustomer(this.form.value).subscribe();
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
        this.customerService.deleteCustomer(customer).subscribe();
      }
    });
  }
}
