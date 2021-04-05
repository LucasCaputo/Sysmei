import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { CustomerService } from '../../../customer/customer.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
})
export class SchedulingFormComponent implements OnInit {
  @ViewChild('titleInput') titleInput: ElementRef | undefined;
  @ViewChild('customerInput') customerInput: ElementRef | undefined;
  user = this.authService.getUser();

  title = '';
  customer: string = '';

  customerControl = new FormControl();
  options: string[] = ['1', '2', '3', '4'];
  filteredOptions: Observable<string[]>;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {
    this.filteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit(): void {
    let customers = this.customerService.getCustomer(this.user).subscribe(
      (response) => {
        console.log(response);

        response.forEach((element: any) => {
          /*   this.options.push(
            `${element.id} -${element.nome} - ${element.email}`
          ); */
          /*  this.options.push(element.id); */
        });
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(customers);
    console.log(this.data);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
