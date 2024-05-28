import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeResponse } from 'src/app/repository/intefaces/employee-response';
import { EmployeeDialogComponent } from 'src/app/shared/components/dialogs/employee-dialog/employee-dialog.component';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  customerList: Array<EmployeeResponse> = [];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.searchEmployeeList();
  }

  /**Busca lista de prestadores e salva na variável */
  private searchEmployeeList() {
    this.employeeService.$employee.subscribe((result) => {
      if (result.length) {
        this.customerList = result;
      }
    });
  }

  openDialog(dataInfo: any) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: dataInfo,
    });
  }
}
