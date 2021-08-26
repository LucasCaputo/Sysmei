import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeResponse } from 'src/app/repository/intefaces/employee-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { EmployeeDialogComponent } from '../shared/dialogs/employee-dialog/employee-dialog.component';
import { EmployeeService } from '../shared/services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  customerList: Array<EmployeeResponse> = [];

  letters: Array<string> = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.searchEmployeeList();
    
  }

  /**Busca lista de prestadores e salva na variável */
  private searchEmployeeList() {
    this.employeeService.$employee.subscribe((result) => {
      console.log(result);
      this.customerList = result;
    });
  }

  openDialog(dataInfo: any) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: dataInfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if(result ==='close'){
        return
      }else{
        this.employeeService.searchEmployeeList();
        this.searchEmployeeList();
      }
    });
  }
}
