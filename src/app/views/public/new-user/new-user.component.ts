import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';

import { NewUserService } from './new-user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  @ViewChild('telefoneInput') telefoneInput: ElementRef | undefined;
  @ViewChild('loginInput') loginInput: ElementRef | undefined;
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined;
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined;

  telefone = '';
  login = '';
  nome = '';
  senha = '';

  formControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private newUserService: NewUserService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.newUserService.postUser(form.form.value).subscribe(
      (response) => {
        this.snackbarService.openSnackBar(
          `Parabéns! usuário ${this.nome} cadastrado com sucesso, faça login`,
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
