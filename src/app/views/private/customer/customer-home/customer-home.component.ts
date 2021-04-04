import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerResponse } from '../customer.interface';
import { CustomerService } from '../customer.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';


@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {

   customerList: CustomerResponse[] = [];
   user = this.authService.getUser()

  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomer(this.user).subscribe(
      response => this.customerList = response,
      error => {
        alert(error.error.message);
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService.postCustomer(result).subscribe(
          (response) => {
            this.customerService.getCustomer(this.user).subscribe(
              response => this.customerList = response,
              error => {
                alert(error.error.message);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
