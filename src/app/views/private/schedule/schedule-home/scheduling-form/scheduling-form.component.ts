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

import { ScheduleService } from 'src/app/views/private/schedule/schedule.service';
import { CustomerService } from '../../../customer/customer.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
})
export class SchedulingFormComponent implements OnInit {
  @ViewChild('titleInput') titleInput: ElementRef | undefined;
  @ViewChild('customerInput') customerInput: ElementRef | undefined;

  title = '';
  customer: string = '';

  states: string[] = []

  user = this.authService.getUser()

  constructor(
    private scheduleService: ScheduleService,
    private customerService: CustomerService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {}

  ngOnInit(): void {
    let customers = this.customerService.getCustomer(this.user).subscribe(
      (response) => {
        console.log(response);

        response.forEach((element:any)=> {
          // this.states.push(`${element.id} - ${element.nome} - ${element.email}`)
          this.states.push(element.id)
        })

      },
      (error) => {
        console.log(error);
      }
    );

    console.log(customers);
    
      
      
  }
}
