import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CardComponent } from 'src/app/shared/components/card/card.component';
import { EmployeeDialogComponent } from 'src/app/shared/components/dialogs/employee-dialog/employee-dialog.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { EmployeeResponse } from 'src/app/shared/interfaces/employee-response';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    MatSidenavModule,
    MatListModule,
    MenuComponent,
    CardComponent,
    SharedModule,
  ],
})
export class EmployeeComponent implements OnInit {
  customerList: Array<EmployeeResponse> = [];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
  ) { }

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
      maxWidth: '90vw',
      data: dataInfo,
      position: {
        top: '90px',
      },
    });
  }
}
