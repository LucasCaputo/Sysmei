import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { EmployeeResponse } from 'src/app/shared/interfaces/employee-response';
import { EmployeeRepository } from '../service-api/employee.repository';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public employee!: Array<EmployeeResponse>;
  public $employee: BehaviorSubject<Array<EmployeeResponse>> =
    new BehaviorSubject<Array<EmployeeResponse>>([]);

  constructor(private employeeRepository: EmployeeRepository) { }

  /** Busca lista de usuários e salva na variável employee */
  public searchEmployeeList(): void {
    console.log(this.employeeRepository.user)
    this.employeeRepository.getEmployee(this.employeeRepository.user).subscribe((employeeList) => {
      this.setSearchEmployeeList(employeeList);
    });
  }

  public setSearchEmployeeList(employeeList: any) {
    this.employee = employeeList;
    this.$employee.next(employeeList);
    localStorage.setItem('employee', JSON.stringify(employeeList));
  }

  /** Cadastra novo prestador */
  public postEmployee(
    employee: EmployeeResponse,
  ): Observable<EmployeeResponse> {
    return this.employeeRepository.postEmployee(employee);
  }
}
