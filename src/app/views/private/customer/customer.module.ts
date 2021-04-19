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

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerFormComponent,
    CustomerMobileComponent,
    IconCustomerPipe,
    IconColorPipe,
  ],
  imports: [
    CustomerRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    NgxMaskModule.forRoot(),
    SharedModule,
  ],
  providers: [],
})
export class CustomerModule {}
