import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import { CustomerService } from '../../../customer/customer.service';
import { ScheduleService } from '../../schedule.service';

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

  title = this.data.title || '';
  dateStart = new Date();
  timeStart = '';
  dateEnd = new Date();
  timeEnd = '';
  customer!: number;
  customerEdit: any;

  customerControl = new FormControl();

  options: Array<{
    id: number;
    text: string;
    phone: string;
    nome: string;
  }> = [];

  filteredOptions: Observable<Array<{ id: number; text: string }>>;
  loading = false;

  @ViewChild('myInput') myInput: ElementRef | undefined;

  constructor(
    private customerService: CustomerService,
    private scheduleService: ScheduleService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      end: Date;
      start: Date;
      startStr: string;
      endStr: string;
      title: string;
      paciente_id: number;
    },
    private router: Router,
    private localStorageService: LocalStorageService,
    private utilService: UtilsService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    this.filteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit(): void {
    let hasLocalStorage = this.localStorageService.getCustomer();

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
    this.customer = this.data.paciente_id;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.myInput?.nativeElement.focus();
    }, 300);
  }

  formatCustomers(response: any) {
    response.forEach((element: any) => {
      let phone = element.telefone1;

      if (element.id == this.data.paciente_id) {
        (this.customerEdit = `${element.nome} - ${this.utilService.formatPhone(
          phone
        )}`),
          (this.customer = element.id);
      }

      this.options.push({
        ...element,
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

  onDelete(customer: any) {
    console.log(customer);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        confirmed: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmed && customer._def.publicId) {
        this.scheduleService.deleteScheduling(customer._def.publicId).subscribe(
          (response) => {
            localStorage.removeItem('scheduling');

            this.snackbarService.openSnackBar(
              `Agendamento deletado com sucesso, aguarde que será removido da sua agenda`,
              'X',
              false
            );
            this.dialog.closeAll();
          },
          (error) => {
            console.log(error);
            this.snackbarService.openSnackBar(
              `Tivemos um erro para deletar, tente novamente`,
              'X',
              true
            );
          }
        );
      } else {
        this.snackbarService.openSnackBar(
          `Tivemos um erro para deletar, tente novamente`,
          'X',
          true
        );
      }
    });
  }
}
