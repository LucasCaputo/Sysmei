import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerResponse } from '../../customer.interface';
import { CustomerService } from '../../customer.service';

import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customer-mobile',
  templateUrl: './customer-mobile.component.html',
  styleUrls: ['./customer-mobile.component.scss'],
})
export class CustomerMobileComponent implements OnInit {
  customerList: CustomerResponse[] = [];
  user = this.authService.getUser();
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomer(this.user).subscribe(
      (response) => (this.customerList = response),
      (error) => {
        alert(error.error.message);
      }
    );
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
              (response) => (this.customerList = response),
              (error) => {
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

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
