import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InitializeService } from 'src/app/repository/services/initialize/initialize.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateRoutesGuard implements CanActivate {
  user: any = this.authService.getUser();

  constructor(
    private authService: AuthService,
    private router: Router,
    private InitializeService: InitializeService
  ) {}

  canActivate(): boolean {
    const isLoged = this.authService.isLoged();

    if (isLoged) {
      this.InitializeService.initialize(this.user?.login);
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }
}
