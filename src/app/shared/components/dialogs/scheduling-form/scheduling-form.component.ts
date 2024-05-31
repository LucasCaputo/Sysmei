import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmployeeResponse } from 'src/app/repository/intefaces/employee-response';
import { ScheduleFormatResponse } from 'src/app/repository/intefaces/schedule-response';
import { ScheduleRepository } from 'src/app/repository/services/schedule/schedule.repository';
import { ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutocompleteOptions } from './interfaces/autocomplete-options';
import { CustomerData } from './interfaces/customer-data';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
  standalone: true,
  imports: [SharedModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule]
})
export class SchedulingFormComponent implements OnInit {
  user = this.authService.getUser();

  form!: UntypedFormGroup;

  customerData: Array<CustomerData> =
    this.customerService.formattedCustomerList;
  employeeData: Array<EmployeeResponse> = this.employeeService.employee;

  hiddenEmployee = false;

  filteredOptions!: Observable<Array<AutocompleteOptions>>;

  @ViewChild('myInput') myInput: ElementRef | undefined;

  constructor(
    private scheduleService: ScheduleService,
    private customerService: CustomerService,
    private scheduleRepository: ScheduleRepository,
    private employeeService: EmployeeService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA)
    public data: ScheduleFormatResponse,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private formBuilder: UntypedFormBuilder,
  ) {
    setTimeout(() => {
      this.filteredOptions = this.form.controls.customer.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value)),
      );
    }, 0);
  }

  ngOnInit(): void {
    console.log(this.data)
    let end = '';
    let start = '';

    if (this.data?.start && this.data?.end) {
      start = `${('0' + this.data?.start?.getHours())?.slice(-2)}:${('0' + this.data?.start?.getMinutes())?.slice(-2)}`;
      end = `${('0' + this.data?.end?.getHours())?.slice(-2)}:${('0' + this.data?.end?.getMinutes())?.slice(-2)}`;
    }

    this.form = this.formBuilder.group({
      allDay: this.data?.start || new Date(),
      detalhes: this.data?.detalhes || '',
      end,
      id: this.data?.schedule_id,
      customer:
        this.customerData.find((e) => e.id === this.data?.customer?.id) || '',
      pagamento: this.data?.pagamento || '',
      employee: this.data?.employee || this.employeeData[0],
      start,
      title: this.data?.Title || '',
      valor: this.data?.valor || '',
    });

    if (this.employeeData?.length > 1) {
      this.hiddenEmployee = true;
    }
  }

  ngAfterViewInit() {
    if (this.data?.schedule_id) {
      return;
    }
    setTimeout(() => {
      this.myInput?.nativeElement.focus();
    }, 300);
  }

  private _filter(value: any): Array<AutocompleteOptions> {
    let filterValue = '';
    if (value?.text) {
      filterValue = value.text.toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }

    return this.customerData.filter((option) =>
      option.text.toLowerCase().includes(filterValue),
    );
  }

  displayCustomer(option: any) {
    return option?.text || '';
  }

  saveScheduleData() {
    const schedule = this.scheduleService.formatRequestPayload(this.form.value);

    if (schedule.id) {
      this.scheduleService.updateScheduling(schedule, schedule.id).subscribe(
        (resultUpdate) => {
          this.scheduleService.searchScheduleList();
          this.snackbarService.openSnackBar(
            `Agendamento atualizado com sucesso`,
            'X',
            false,
          );
        },
        (error) => {
          console.log(error, 'update');
          this.scheduleService.searchScheduleList();
          this.snackbarService.openSnackBar(
            `Tivemos um erro para atualizar, tente novamente`,
            'X',
            true,
          );
        },
      );
    } else {
      this.scheduleService.postScheduling(schedule).subscribe(
        (response) => {
          this.scheduleService.searchScheduleList();
          this.snackbarService.openSnackBar(
            `Agendamento adicionado com sucesso`,
            'X',
            false,
          );
        },
        (error) => {
          console.log(error);
          this.scheduleService.searchScheduleList();
          this.snackbarService.openSnackBar(
            `Tivemos um erro para inserir, tente novamente`,
            'X',
            true,
          );
        },
      );
    }
  }

  onDelete(customer: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '280px',
      maxWidth: '100vw',
      data: {
        confirmed: false,
      },
      position: {
        top: '70px'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(customer)
      if (result?.confirmed && customer?.schedule_id) {
        this.dialog.closeAll();
        this.scheduleRepository
          .deleteScheduling(customer.schedule_id)
          .subscribe(
            (response) => {
              this.scheduleService.searchScheduleList();
              this.snackbarService.openSnackBar(
                `Agendamento deletado com sucesso`,
                'X',
                false,
              );
            },
            (error) => {
              console.log(error);
              this.snackbarService.openSnackBar(
                `Tivemos um erro para deletar, tente novamente`,
                'X',
                true,
              );
            },
          );
      }
    });
  }
}
