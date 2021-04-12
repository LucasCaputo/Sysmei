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
  getList: Array<any> = [];
  customerList: Array<any> = [];
  letters: Array<string> = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  user = this.authService.getUser();

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  formatContacts(list: CustomerResponse) {
    this.getList = [];
    this.customerList = [];

    this.getList.push(list);
    this.getList[0].sort((a: any, b: any) => {
      if (a.nome < b.nome) {
        return -1;
      } else {
        return true;
      }
    });

    for (let i = 0; i < this.letters.length; i++) {
      let letter = this.letters[i]; // A

      this.getList[0].forEach((element: any) => {
        if (
          letter == element.nome[0] ||
          letter.toLowerCase == element.nome[0]
        ) {
          this.customerList.push({ inicial: letter, ...element });
        }
      });
    }

    console.log(this.customerList);
  }

  getCustomers() {
    this.customerService.getCustomer(this.user).subscribe(
      (response) => this.formatContacts(response),
      (error) => {
        alert('Seu token venceu, faça login novamente');
        this.authService.logout();
        this.router.navigate(['login']);
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
            if (response) {
              this.getCustomers();
            }
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
