import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { EmployeeDialogModule } from 'src/app/shared/components/dialogs/employee-dialog/employee-dialog.module';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { SharedModule } from 'src/app/shared/shared.module';

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
