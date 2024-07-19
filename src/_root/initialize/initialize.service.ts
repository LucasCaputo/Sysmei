import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(
    private authService: AuthService,
    private user: UserService,
    private router: Router,
  ) {}

  /** Método de inicialização */
  public initialize() {
    this.user.getUser().subscribe(
      (user) => {
        this.authService.setUser(user);
      },
      () => {
        this.authService.logout();
      },
    );
  }
}
