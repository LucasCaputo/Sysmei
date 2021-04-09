import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { NewUserService } from './new-user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({ opacity: 0.5 }),
        animate('400ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class NewUserComponent implements OnInit {
  profileForm = this.fb.group({
    telefone: [''],
    login: ['', [Validators.email]],
    nome: ['', this.checkName],
    senha: [''],
  });

  type = 'password';

  isOpen = true;

  constructor(
    private newUserService: NewUserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  checkName(input: FormControl) {
    const hasNumber = /[0-9]/.test(input.value);

    if (hasNumber) return { hasNumber: true };
    else {
      const name = input.value.split(' ');

      const filtrado = name.filter((x: string) => {
        if (x != '' && x.length > 1) return { isNameComplete: true };

        return null;
      });

      return filtrado.length < 2 ? { isNameComplete: true } : null;
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.newUserService.postUser(this.profileForm.value).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Parabéns! usuário ${this.profileForm.value.nome} cadastrado com sucesso, faça login`,
            'X',
            false
          );
          this.router.navigate(['/login']);
        },
        (error) => {
          this.snackbarService.openSnackBar(
            `Tente novamente ( ${error.error}) `,
            'X',
            true
          );
          console.log(error);
        }
      );
    }
  }
}
