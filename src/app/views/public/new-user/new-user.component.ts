import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { NgForm } from '@angular/forms';

import { NewUserService } from './new-user.service';

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

  constructor(public newUserService: NewUserService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.newUserService.postUser(form.form.value).subscribe((result: any) => {
      console.log(result);
    });
  }
}
