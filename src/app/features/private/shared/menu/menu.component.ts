import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from '../services/customer/customer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  constructor(public auth: AuthService, public router: Router, private customerService: CustomerService) {}

  /** Faz logout do sistema */
  public logout(): void {
    this.customerService.customers = [];
    this.customerService.$customers.next([]);
    this.customerService.formattedCustomerList = [];

    this.auth.logout();
    this.router.navigate(['login']);
  }

  /** Redireciona para rota selecionada */
  public redirect(router: string): void {
    this.router.navigate([router]);
  }
}
