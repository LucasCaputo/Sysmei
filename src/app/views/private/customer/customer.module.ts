import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';

import { CustomerFormComponent } from './customer-home/customer-form/customer-form.component';
import { CustomerMobileComponent } from './customer-home/customer-mobile/customer-mobile.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { NgxMaskModule } from 'ngx-mask';
import { IconCustomerPipe } from 'src/app/shared/pipes/icon-customer.pipe';
import { IconColorPipe } from 'src/app/shared/pipes/icon-color.pipe';

import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerRecordComponent } from './customer-home/customer-record/customer-record.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { CustomerCompleteRegistrationComponent } from './customer-home/customer-record/customer-complete-registration/customer-complete-registration.component';
import { RecordListComponent } from './customer-home/customer-record/record-list/record-list.component';
import { OpenPhotoComponent } from './customer-home/customer-record/open-photo/open-photo.component';
import { ScheduleDialogModule } from '../shared/schedule-dialog/schedule-dialog.module';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerFormComponent,
    CustomerMobileComponent,
    IconCustomerPipe,
    IconColorPipe,
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
  ],
  providers: [],
})
export class CustomerModule {}
