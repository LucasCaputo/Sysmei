import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { MenuModule } from '../shared/menu/menu.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardModule } from '../shared/card/card.module';
import { EmployeeDialogModule } from '../shared/dialogs/employee-dialog/employee-dialog.module';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MenuModule,
    SharedModule,
    CardModule,
    EmployeeDialogModule,
  ],
})
export class EmployeeModule {}
