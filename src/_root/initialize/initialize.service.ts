import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(
    private customerService: CustomerService,
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService,
    private auth: AuthService,
  ) { }

  /** Método de inicialização */
  public initialize(user: any) {
    if (!user) {
      user = this.auth.getUser()?.login;
    }
    this.customerService.searchCustomerList();
    this.employeeService.searchEmployeeList();

    setTimeout(() => {
      this.scheduleService.searchScheduleList();
    }, 3000);
  }
}
