import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateRoutesGuard } from './shared/guards/private-routes/private-routes.guard';
import { PublicRoutesGuard } from './shared/guards/public-routes/public-routes.guard';
import { Erro404Component } from './shared/pages/erro404/erro404.component';
import { PrivateComponent } from './features/private/private.component';
import { PublicComponent } from './features/public/public.component';

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
    component: PublicComponent,
    canActivate: [PublicRoutesGuard],
    children: [
      {
        path: 'cadastro',
        loadChildren: () =>
          import('./features/public/new-user/new-user.module').then(
            (m) => m.NewUserModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./features/public/login/login.module').then(
            (m) => m.LoginModule
          ),
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
