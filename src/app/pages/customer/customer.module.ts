import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomerComponent } from './components/customer-list/customer.component';
import { CustomerCompleteRegistrationComponent } from './components/customer-record/customer-complete-registration/customer-complete-registration.component';
import { CustomerRecordComponent } from './components/customer-record/customer-record.component';
import { RecordListComponent } from './components/customer-record/record-list/record-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CustomerDialogModule } from 'src/app/shared/components/dialogs/customer-dialog/customer-dialog.module';
import { ScheduleDialogModule } from 'src/app/shared/components/dialogs/schedule-dialog/schedule-dialog.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskDirective } from 'ngx-mask';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerRecordComponent,
    RecordListComponent,
  ],
  imports: [
    CustomerCompleteRegistrationComponent,
    CustomerRoutingModule,
    MatMenuModule,
    MatListModule,
    SharedModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    ScheduleDialogModule,
    CustomerDialogModule,
    MatSidenavModule,
    NgxMaskDirective,
    HeaderComponent,
    MenuComponent,
  ],
  providers: [],
})
export class CustomerModule { }
