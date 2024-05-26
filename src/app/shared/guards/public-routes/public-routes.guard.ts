import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicRoutesGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const isLoged = this.authService.isLoged();

    if (!isLoged) {
      return true;
    }

    this.router.navigate(['agenda']);

    return false;
  }
}
