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
    private auth: AuthService,
    private loaderService: LoaderService,
  ) { }

  /** Método de inicialização */
  public initialize() {
    forkJoin([
      this.customerRepository.getCustomer(this.auth.getUser()?.login),
      this.scheduleRepository.getSchedule(),
      this.employeeRepository.getEmployee(),
    ]).subscribe(([customerList, scheduleList, employeeList]) => {
      this.employeeService.setSearchEmployeeList(employeeList);
      this.customerService.setSearchCustomerList(customerList);
      this.scheduleService.setSearchScheduledList(scheduleList);
      this.loaderService.setFirstLoad(false);
    });
  }
}
