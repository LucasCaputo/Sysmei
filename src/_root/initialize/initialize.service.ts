import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { CustomerRepository } from 'src/app/shared/services/service-api/customer.repository';
import { EmployeeRepository } from 'src/app/shared/services/service-api/employee.repository';
import { ScheduleRepository } from 'src/app/shared/services/service-api/schedule.repository';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(
    private customerService: CustomerService,
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService,
    private customerRepository: CustomerRepository,
    private scheduleRepository: ScheduleRepository,
    private employeeRepository: EmployeeRepository,
    private authService: AuthService,
    private loaderService: LoaderService,
    private user: UserService
  ) { }

  /** Método de inicialização */
  public initialize() {
    this.user.getUser().subscribe((user)=> {
      this.employeeRepository.user = user.login
      this.scheduleRepository.user = user.login
      this.authService.setUser(user)
      forkJoin([
        this.customerRepository.getCustomer(user.login),
        this.scheduleRepository.getSchedule(user.login),
        this.employeeRepository.getEmployee(user.login),
      ]).subscribe(([customerList, scheduleList, employeeList]) => {
        this.employeeService.setSearchEmployeeList(employeeList);
        this.customerService.setSearchCustomerList(customerList);
        this.scheduleService.setSearchScheduledList(scheduleList);
        this.loaderService.setFirstLoad(false);
      });
    })
  }
}
