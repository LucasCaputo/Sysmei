import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from '../../services/customer/customer.service';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';

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

  constructor(public auth: AuthService, public router: Router, private customerService: CustomerService, private dialog: MatDialog) { }

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

  public openUserSettingsModal(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      position: {
        top: '70px'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      
    });
  }
}