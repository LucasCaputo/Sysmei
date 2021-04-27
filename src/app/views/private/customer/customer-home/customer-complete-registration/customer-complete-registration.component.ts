import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerResponse } from '../../customer.interface';

@Component({
  selector: 'app-customer-complete-registration',
  templateUrl: './customer-complete-registration.component.html',
  styleUrls: ['./customer-complete-registration.component.scss'],
})
export class CustomerCompleteRegistrationComponent implements OnInit {
  @Input() data: CustomerResponse | undefined;

  profileForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nome: [this.data?.nome || ''],
      telefone: [this.data?.telefone1 || ''],
      email: [this.data?.email || '', [Validators.email]],
    });
  }

  onSubmit() {
    console.log('submit');
  }
}
