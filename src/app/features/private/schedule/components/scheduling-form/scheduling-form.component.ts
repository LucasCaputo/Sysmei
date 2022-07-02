import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CustomerResponse } from 'src/app/repository/intefaces/customer-response';
import { ScheduleRepository } from 'src/app/repository/services/schedule/schedule.repository';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { AutocompleteOptions } from './interfaces/autocomplete-options';
import { CustomerData } from './interfaces/customer-data';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
})
export class SchedulingFormComponent implements OnInit {
  
  user = this.authService.getUser();

  title = this.data.title || '';
  dateStart = new Date();
  timeStart = '';
  dateEnd = new Date();
  timeEnd = '';
  customer!: number;
  valor = this.data.extendedProps?.valor || '';
  detalhes = this.data.extendedProps?.detalhes || '';
  pagamento = this.data.extendedProps?.pagamento || '';

  customerControl = new FormControl();

  customerData: Array<CustomerData> = [];

  filteredOptions: Observable<Array<AutocompleteOptions>>;
  loading = false;

  @ViewChild('myInput') myInput: ElementRef | undefined;

  constructor(
    private customerService: CustomerService,
    private scheduleRepository: ScheduleRepository,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      end: Date;
      start: Date;
      startStr: string;
      endStr: string;
      title: string;
      extendedProps: {
        login_usuario: string;
        customer: string;
        status: number;
        paciente_id: number;
        valor: number;
        detalhes: string;
        pagamento: string;
      };
    },
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

    this.customerService.$customers.subscribe(
      (result: Array<CustomerResponse>) => {
        this.formatCustomers(result);
      }
    );

    this.dateStart = this.data.start;
    this.timeStart = this.data.startStr.slice(11, 16);
    this.dateEnd = this.data.end;
    this.timeEnd = this.data.endStr.slice(11, 16);
  }

  displayCustomer(option: any) {
    if (option) {
      return `${option.nome} - (${option.telefone1.slice(
        0,
        2
      )}) ${option.telefone1.slice(2, 3)} ${option.telefone1.slice(
        3,
        7
      )}-${option.telefone1.slice(7, 11)}`;
    }

    return option;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.myInput?.nativeElement.focus();
    }, 300);
  }

  formatCustomers(response: any) {
    response.forEach((element: any) => {
      let phone = element.telefone1;

      if (
        element.id == this.data.extendedProps?.customer ||
        element.id == this.data.extendedProps?.paciente_id
      ) {
        this.customer = element.id;

        this.customerControl.setValue(element);
      }

      this.customerData.push({
        ...element,
        text: `${element.nome} - ${this.utilService.formatPhone(phone)}`,
      });
    });
  }

  private _filter(value: any): Array<AutocompleteOptions> {
    let filterValue = '';
    if (value?.text) {
      filterValue = value.text.toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }

    return this.customerData.filter((option) =>
      option.text.toLowerCase().includes(filterValue)
    );
  }

  onDelete(customer: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        confirmed: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmed && customer._def.publicId) {
        this.scheduleRepository
          .deleteScheduling(customer._def.publicId)
          .subscribe(
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
      }
    });
  }
}
