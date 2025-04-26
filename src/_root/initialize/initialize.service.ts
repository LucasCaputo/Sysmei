import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(
    private authService: AuthService,
    private user: UserService,
  ) {}

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
