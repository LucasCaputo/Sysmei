import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined;
  @ViewChild('telefone1Input') telefone1Input: ElementRef | undefined;
  @ViewChild('emailInput') emailInput: ElementRef | undefined;

  nome = '';
  telefone1 = '';
  email = '';
  login_usuario = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.login_usuario = this.authService.getUser()?.login!;
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
