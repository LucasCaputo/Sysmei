import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateRoutesGuard } from './shared/guards/private-routes/private-routes.guard';
import { PublicRoutesGuard } from './shared/guards/public-routes/public-routes.guard';

const routes: Routes = [
  {
    path: 'user/token',
    loadComponent: () =>
      import('./pages/email-confirmation/email-confirmation.component').then(
        (m) => m.EmailConfirmationComponent,
      ),
  },
  {
    path: '',
    canActivate: [PrivateRoutesGuard],
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/customer/customer.component').then(
            (m) => m.CustomerComponent,
          ),
      },
      {
        path: 'clientes/ficha/:id',
        loadComponent: () =>
          import('./pages/customer-record/customer-record.component').then(
            (m) => m.CustomerRecordComponent,
          ),
      },
      {
        path: 'agenda',
        loadComponent: () =>
          import('./pages/calendar/calendar.component').then(
            (m) => m.CalendarComponent,
          ),
      },
      {
        path: 'prestador',
        loadComponent: () =>
          import('./pages/employee/employee.component').then(
            (m) => m.EmployeeComponent,
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
        loadComponent: () =>
          import('./pages/new-user/new-user.component').then(
            (m) => m.NewUserComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/erro404/erro404.component').then(
        (m) => m.Erro404Component,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
