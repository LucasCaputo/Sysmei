import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicRoutesGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoged = this.authService.isLoged();

    console.log(isLoged, 'Está logado?');

    if (!isLoged) {
      return true;
    }

    this.router.navigate(['agenda']);

    return false;
  }
}
