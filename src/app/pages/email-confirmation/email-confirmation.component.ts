import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent {

  code: string | null = null;
  message: string = '';
  isError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

// localhost:4200/user/token?code=abc123

  ngOnInit() {

    this.code = this.route.snapshot.paramMap.get('code');

    if (this.code) {
      this.verifyToken(this.code);
    } else {
      this.message = 'Token não encontrado na URL.';
      this.isError = true;
    }
  }

  verifyToken(code: string) {

    this.http.get(`/user/token?code=${code}`).subscribe({
      next: (response: any) => {
        console.log('Sucesso:', response)
        this.message = 'E-mail confirmado com sucesso!';
        this.isError = false;
      },
      error: (error: any) => {
        console.log('Erro na confirmação:', error)
        this.message = 'Erro na confirmação do e-mail.';
        this.isError = true;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
