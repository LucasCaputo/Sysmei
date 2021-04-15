import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import { CustomerService } from '../../../customer/customer.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
})
export class SchedulingFormComponent implements OnInit {
  @ViewChild('titleInput') titleInput: ElementRef | undefined;

  @ViewChild('dateStartInput') dateStartInput: ElementRef | undefined;
  @ViewChild('timeStartInput') timeStartInput: ElementRef | undefined;
  user = this.authService.getUser();

  title = '';
  dateStart = new Date();
  timeStart = '';
  dateEnd = new Date();
  timeEnd = '';
  customer!: number;

  customerControl = new FormControl();
  options: Array<{ id: number; text: string }> = [];
  filteredOptions: Observable<Array<{ id: number; text: string }>>;
  loading = false;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA)
    public data: { end: Date; start: Date; startStr: string; endStr: string },
    private router: Router,
    private localStorageService: LocalStorageService,
    private utilService: UtilsService
  ) {
    this.filteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit(): void {
    const hasLocalStorage = this.localStorageService.getCustomer();

    if (hasLocalStorage) {
      this.formatCustomers(hasLocalStorage);
    } else {
      this.loading = true;

      let customers = this.customerService.getCustomer(this.user).subscribe(
        (response) => {
          console.log(response);

          this.formatCustomers(response);
        },
        (error) => {
          alert('Seu token venceu, faça login novamente');
          this.authService.logout();
          this.router.navigate(['login']);
        },
        () => {
          this.loading = false;
        }
      );
      console.log(customers);
    }

    console.log(this.data);

    this.dateStart = this.data.start;
    this.timeStart = this.data.startStr.slice(11, 16);
    this.dateEnd = this.data.end;
    this.timeEnd = this.data.endStr.slice(11, 16);

    console.log(this.timeStart);
  }

  formatCustomers(response: any) {
    response.forEach((element: any) => {
      let phone = element.telefones[0].numero;

      this.options.push({
        id: element.id,
        text: `${element.nome} - ${this.utilService.formatPhone(phone)}`,
      });
    });
  }

  private _filter(value: string): Array<{ id: number; text: string }> {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.text.toLowerCase().includes(filterValue)
    );
  }
}
