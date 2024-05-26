import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { EmployeeResponse } from 'src/app/repository/intefaces/employee-response';
import { EmployeeRepository } from 'src/app/repository/services/employee/employee.repository';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public employee!: Array<EmployeeResponse>;
  public $employee: BehaviorSubject<Array<EmployeeResponse>> =
    new BehaviorSubject<Array<EmployeeResponse>>([]);

  constructor(private employeeRepository: EmployeeRepository) {}

  /** Busca lista de usuários e salva na variável employee */
  public searchEmployeeList(): void {
    this.employeeRepository.getEmployee().subscribe((employeeList) => {
      this.employee = employeeList;
      this.$employee.next(employeeList);
    });
  }

  /** Cadastra novo prestador */
  public postEmployee(
    employee: EmployeeResponse,
  ): Observable<EmployeeResponse> {
    return this.employeeRepository.postEmployee(employee);
  }
}
