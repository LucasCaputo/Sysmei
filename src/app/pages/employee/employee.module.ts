import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { MatListModule } from '@angular/material/list';
import { EmployeeDialogModule } from 'src/app/shared/components/dialogs/employee-dialog/employee-dialog.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    SharedModule,
    EmployeeDialogModule,
    HeaderComponent,
    CardComponent,
    MenuComponent,
  ],
})
export class EmployeeModule { }
