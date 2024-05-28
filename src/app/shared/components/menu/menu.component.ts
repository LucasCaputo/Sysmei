import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from '../../services/customer/customer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule, MatSidenavModule, MatButtonModule]

})
export class MenuComponent {

  user = this.auth.getUser();

  menuData = [
    {
      redirect: 'agenda',
      label: 'Agenda',
      icon: 'date_range'
    },
    {
      redirect: 'clientes',
      label: 'Clientes',
      icon: 'account_circle'
    },
    {
      redirect: 'prestador',
      label: 'Prestador',
      icon: 'badge'
    }
  ]

  constructor(public auth: AuthService, public router: Router, private customerService: CustomerService) { }

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