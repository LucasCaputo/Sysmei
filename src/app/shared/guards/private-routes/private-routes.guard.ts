import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CustomerService } from 'src/app/views/private/customer/customer.service';
import { ScheduleService } from 'src/app/views/private/schedule/schedule.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateRoutesGuard implements CanActivate {
  user = this.authService.getUser();

  constructor(
    private authService: AuthService,
    private router: Router,
    private scheduleService: ScheduleService,
    private customerService: CustomerService
  ) {}

  canActivate(): boolean {
    const isLoged = this.authService.isLoged();

    if (isLoged) {
      this.customerService.getCustomer(this.user).subscribe(
        (response) => {
          localStorage.removeItem('customer');
          localStorage.setItem('customer', JSON.stringify(response));
        },
        (error) => {
          console.log(error);
        }
      );

      this.scheduleService.getScheduling(this.user).subscribe(
        (response) => {
          localStorage.removeItem('scheduling');
          localStorage.setItem('scheduling', JSON.stringify(response));
        },
        (error) => {
          console.log(error);
        }
      );

      return true;
    }

    this.router.navigate(['login']);

    return false;
  }
}
