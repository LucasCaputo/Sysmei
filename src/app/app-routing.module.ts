import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateRoutesGuard } from './shared/guards/private-routes/private-routes.guard';
import { PublicRoutesGuard } from './shared/guards/public-routes/public-routes.guard';
import { Erro404Component } from './pages/erro404/erro404.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { LoginComponent } from './pages/login/login.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerRecordComponent } from './pages/customer-record/customer-record.component';
import { EmployeeComponent } from './pages/employee/employee.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [PrivateRoutesGuard],
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      { path: 'clientes', component: CustomerComponent, pathMatch: 'full', },
      { path: 'clientes/ficha/:id', component: CustomerRecordComponent },
      {
        path: 'agenda',
        loadChildren: () =>
          import('./pages/schedule/schedule.module').then(
            (m) => m.ScheduleModule,
          ),
      },
      {
        path: 'prestador',
        component: EmployeeComponent,
      },
    ],
  },
  {
    path: '',
    canActivate: [PublicRoutesGuard],
    children: [
      {
        path: 'cadastro',
        component: NewUserComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '**',
    component: Erro404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
