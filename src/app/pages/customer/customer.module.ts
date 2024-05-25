import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
// import { NgxMaskModule } from 'ngx-mask';
import { CustomerComponent } from './components/customer-list/customer.component';
import { CustomerCompleteRegistrationComponent } from './components/customer-record/customer-complete-registration/customer-complete-registration.component';
import { CustomerRecordComponent } from './components/customer-record/customer-record.component';
import { OpenPhotoComponent } from './components/customer-record/open-photo/open-photo.component';
import { RecordListComponent } from './components/customer-record/record-list/record-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { CustomerDialogModule } from 'src/app/shared/components/dialogs/customer-dialog/customer-dialog.module';
import { ScheduleDialogModule } from 'src/app/shared/components/dialogs/schedule-dialog/schedule-dialog.module';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { SharedModule } from 'src/app/shared/shared.module';

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
    // NgxMaskModule.forRoot(),
    SharedModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    ScheduleDialogModule,
    MenuModule,
    CustomerDialogModule,
    MatSidenavModule,
  ],
  providers: [],
})
export class CustomerModule {}
