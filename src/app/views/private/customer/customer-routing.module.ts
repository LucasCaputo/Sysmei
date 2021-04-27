import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCompleteRegistrationComponent } from './customer-home/customer-complete-registration/customer-complete-registration.component';

import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerRecordComponent } from './customer-home/customer-record/customer-record.component';

const routes: Routes = [
  { path: '', component: CustomerHomeComponent },
  { path: 'ficha/:id', component: CustomerRecordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {
  constructor() {}
}
