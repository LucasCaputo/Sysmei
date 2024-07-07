import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InitializeService } from 'src/_root/initialize/initialize.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateRoutesGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private InitializeService: InitializeService,
  ) {}

  canActivate(): boolean {
    const isLoged = this.authService.isLoged();

    if (isLoged) {
      this.InitializeService.initialize();
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }
}
