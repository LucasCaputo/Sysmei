import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';

import { NgxMaskModule } from 'ngx-mask';
import { IconColorPipe } from '../../../shared/pipes/icon-color.pipe';
import { IconCustomerPipe } from '../../../shared/pipes/icon-customer.pipe';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerRecordComponent } from './components/customer-record/customer-record.component';
import { CustomerCompleteRegistrationComponent } from './components/customer-complete-registration/customer-complete-registration.component';
import { RecordListComponent } from './components/record-list/record-list.component';
import { OpenPhotoComponent } from './components/open-photo/open-photo.component';
import { ScheduleDialogModule } from '../shared/dialogs/schedule-dialog/schedule-dialog.module';
import { MenuModule } from '../shared/menu/menu.module';
import { CustomerDialogModule } from '../shared/dialogs/customer-dialog/customer-dialog.module';
import { MatSidenavModule } from '@angular/material/sidenav';

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
