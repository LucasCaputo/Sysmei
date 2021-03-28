import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { NgForm } from '@angular/forms';

import { NewUserService } from 'src/app/shared/services/new-user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  @ViewChild('cpfInput') cpfInput: ElementRef | undefined;
  @ViewChild('loginInput') loginInput: ElementRef | undefined;
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined;
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined;

  cpf = '';
  login = '';
  nome = '';
  senha = '';

  constructor(@Inject(NewUserService) public NewUserService: any) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.NewUserService.postUser(form.form.value).subscribe((result: any) => {
      console.log(result);
    });
  }
}
