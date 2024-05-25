import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateRoutesGuard } from './shared/guards/private-routes/private-routes.guard';
import { PublicRoutesGuard } from './shared/guards/public-routes/public-routes.guard';
import { Erro404Component } from './shared/pages/erro404/erro404.component';
import { PrivateComponent } from './features/private/private.component';
import { NewUserComponent } from './features/public/pages/new-user/new-user.component';
import { LoginComponent } from './features/public/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canActivate: [PrivateRoutesGuard],
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./features/private/customer/customer.module').then(
            (m) => m.CustomerModule
          ),
      },
      {
        path: 'agenda',
        loadChildren: () =>
          import('./features/private/schedule/schedule.module').then(
            (m) => m.ScheduleModule
          ),
      },
      {
        path: 'prestador',
        loadChildren: () =>
          import('./features/private/employee/employee.module').then(
            (m) => m.EmployeeModule
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [PublicRoutesGuard],
    children: [
      {
        path: 'cadastro',
        component: NewUserComponent
      },
      {
        path: 'login',
       component: LoginComponent
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
export class AppRoutingModule {}
