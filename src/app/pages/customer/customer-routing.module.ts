import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer-list/customer.component';

import { CustomerRecordComponent } from './components/customer-record/customer-record.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'ficha/:id', component: CustomerRecordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {
  constructor() {}
}
