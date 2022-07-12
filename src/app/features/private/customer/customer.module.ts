import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerDialogModule } from '../shared/dialogs/customer-dialog/customer-dialog.module';
import { ScheduleDialogModule } from '../shared/dialogs/schedule-dialog/schedule-dialog.module';
import { MenuModule } from '../shared/menu/menu.module';
import { CustomerComponent } from './components/customer-list/customer.component';
import { CustomerCompleteRegistrationComponent } from './components/customer-record/customer-complete-registration/customer-complete-registration.component';
import { CustomerRecordComponent } from './components/customer-record/customer-record.component';
import { OpenPhotoComponent } from './components/customer-record/open-photo/open-photo.component';
import { RecordListComponent } from './components/customer-record/record-list/record-list.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerRecordComponent,
    CustomerCompleteRegistrationComponent,
    RecordListComponent,
    OpenPhotoComponent,
  ],
  imports: [
    CustomerRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    ScheduleDialogModule,
    MenuModule,
    CustomerDialogModule,
    MatSidenavModule,
  ],
  providers: [],
})
export class CustomerModule {}
