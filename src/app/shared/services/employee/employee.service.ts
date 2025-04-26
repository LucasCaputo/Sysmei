import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';

import { catchError, retry, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { EmployeeResponse } from 'src/app/shared/interfaces/employee-response';
import { EmployeeRepository } from '../../service-api/employee.repository';
import { SnackbarService } from '../snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public employee!: Array<EmployeeResponse>;

  public reloadEmployeeSubject = new Subject<Array<EmployeeResponse>>();

  public searchEmployee$ = this.reloadEmployeeSubject.pipe(
    startWith(void 0),
    switchMap(() => this.searchEmployee()),
    shareReplay(1),
    retry(1),
  );

  constructor(
    private employeeRepository: EmployeeRepository,
    private snackbarService: SnackbarService,
  ) {}

  public reloadEmployee(): void {
    this.reloadEmployeeSubject.next();
  }

  public searchEmployee(): Observable<Array<EmployeeResponse>> {
    return this.employeeRepository.getEmployee().pipe(tap((employeeList) => (this.employee = employeeList)));
  }

  public postEmployee(employee: EmployeeResponse): Observable<EmployeeResponse> {
    return this.employeeRepository.postEmployee(employee).pipe(
      tap(() => {
        this.snackbarService.openSnackBar(`Parabéns! Prestador cadastrado com sucesso!`, 'X', false);

        this.reloadEmployee();
      }),
      catchError(() => {
        this.snackbarService.openSnackBar(`Tivemos um erro ao deletar, tente novamente`, 'X', true);
        return throwError('Erro no update');
      }),
    );
  }

  public editEmployee(employee: EmployeeResponse): Observable<EmployeeResponse> {
    return this.employeeRepository.updateEmployee(employee).pipe(
      tap(() => {
        this.snackbarService.openSnackBar(`Parabéns! Prestador editado com sucesso!`, 'X', false);
        this.reloadEmployee();
      }),
      catchError(() => {
        this.snackbarService.openSnackBar(`Tivemos um erro ao editar, tente novamente`, 'X', true);
        return throwError('Erro no update');
      }),
    );
  }

  public deleteEmployee(employee: EmployeeResponse): Observable<EmployeeResponse> {
    return this.employeeRepository.deleteEmployee(employee).pipe(
      tap(() => {
        this.snackbarService.openSnackBar(`Parabéns! Prestador deletado com sucesso!`, 'X', false);
        this.reloadEmployee();
      }),
      catchError(() => {
        this.snackbarService.openSnackBar(`Tivemos um erro ao deletar, tente novamente`, 'X', true);
        return throwError('Erro no update');
      }),
    );
  }
}
