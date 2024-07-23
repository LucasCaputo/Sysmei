import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
})
export class EmailConfirmationComponent implements OnInit {
  isError = signal(false);

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParams?.code;

    if (code) {
      this.verifyToken(code);
    } else {
      this.isError.set(true);
    }
  }

  verifyToken(code: string) {
    this.userService.getTokenValidation(code).subscribe((res) => {
      console.log(res);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
