import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(
    private customerService: CustomerService,
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private loaderService: LoaderService,
    private user: UserService,
    private router: Router,
  ) {}

  /** Método de inicialização */
  public initialize() {
    this.user.getUser().subscribe(
      (user) => {
        this.authService.setUser(user);
        this.populate();
      },
      () => {
        this.authService.logout();
        this.router.navigate(['login']);
      },
    );
  }

  private populate() {
    this.scheduleService.formatedSchedule$.pipe(first()).subscribe(() => {
      this.loaderService.setFirstLoad(false)
    })

    this.employeeService.searchEmployeeList()
    this.customerService.searchCustomerList()

    setTimeout(() => {
      this.scheduleService.searchScheduleList()
    }, 0);
  }
}
