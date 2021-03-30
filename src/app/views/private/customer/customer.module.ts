import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CustomerHomeComponent],
  imports: [CommonModule, CustomerRoutingModule, HttpClientModule],
  providers: [],
})
export class CustomerModule {}
