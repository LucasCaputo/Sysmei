import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { EmployeeResponse } from 'src/app/shared/interfaces/employee-response';
import { ScheduleFormatResponse } from 'src/app/shared/interfaces/schedule-response';
import { CacheService } from 'src/app/shared/service-api/cache';
import { ScheduleRepository } from 'src/app/shared/service-api/schedule.repository';
import { CustomerRecordService } from 'src/app/shared/services/customer/customer-record.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionButtonsComponent } from '../../action-buttons/action-buttons.component';
import { AutocompleteOptions } from './interfaces/autocomplete-options';
import { CustomerData } from './interfaces/customer-data';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
  standalone: true,
  imports: [SharedModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, ActionButtonsComponent],
})
export class SchedulingFormComponent implements OnInit {
  form!: FormGroup;

  customerData: Array<CustomerData> = this.customerService.formattedCustomerList;
  employeeData: Array<EmployeeResponse> = this.employeeService.employee;

  hiddenEmployee = false;

  filteredOptions!: Observable<Array<AutocompleteOptions>>;

  constructor(
    private scheduleService: ScheduleService,
    private customerService: CustomerService,
    private customerRecordService: CustomerRecordService,
    private scheduleRepository: ScheduleRepository,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA)
    public data: ScheduleFormatResponse,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private formBuilder: UntypedFormBuilder,
    private cacheService: CacheService,
  ) {}

  ngOnInit(): void {
    let end = '';
    let start = '';

    if (this.data?.start && this.data?.end) {
      start = `${('0' + this.data?.start?.getHours())?.slice(-2)}:${('0' + this.data?.start?.getMinutes())?.slice(-2)}`;
      end = `${('0' + this.data?.end?.getHours())?.slice(-2)}:${('0' + this.data?.end?.getMinutes())?.slice(-2)}`;
    }

    const employee =  this.data?.employee || this.employeeData

    if(!employee) {
      this.employeeService.searchEmployee().subscribe(() => {
        this.employeeData = this.employeeService.employee
        console.log( this.employeeService.employee)
        console.log(this.customerData)
        this.form = this.formBuilder.group({
          allDay: this.data?.start || new Date(),
          detalhes: this.data?.detalhes || '',
          end,
          id: this.data?.schedule_id,
          customer: this.customerData.find((e) => e.id === this.data?.customer?.id) || '',
          pagamento: this.data?.pagamento || '',
          employee: this.data?.employee || this.employeeService.employee[0],
          start,
          title: this.data?.Title || '',
          valor: this.data?.valor || '',
          status: this.data?.status || 0,
        });

        if (this.employeeService.employee.length > 1) {
          this.hiddenEmployee = true;
        }

        this.filteredOptions = this.form.controls.customer.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value)),
        );
      })
    }else {
      this.form = this.formBuilder.group({
        allDay: this.data?.start || new Date(),
        detalhes: this.data?.detalhes || '',
        end,
        id: this.data?.schedule_id,
        customer: this.customerData.find((e) => e.id === this.data?.customer?.id) || '',
        pagamento: this.data?.pagamento || '',
        employee: this.data?.employee || this.employeeData[0],
        start,
        title: this.data?.Title || '',
        valor: this.data?.valor || '',
        status: this.data?.status || 0,
      });

      if (this.employeeData?.length > 1) {
        this.hiddenEmployee = true;
      }

      this.filteredOptions = this.form.controls.customer.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value)),
      );
    }
  }

  private _filter(value: any): Array<AutocompleteOptions> {
    let filterValue = '';
    if (value?.text) {
      filterValue = value.text.toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }

    return this.customerData.filter((option) => option.text.toLowerCase().includes(filterValue));
  }

  displayCustomer(option: any) {
    return option?.text || '';
  }

  saveScheduleData() {
    const schedule = this.scheduleService.formatRequestPayload(this.form.value);

    this.cacheService.clearAllCache();

    if (schedule.id) {
      this.scheduleService.updateScheduling(schedule, schedule.id).subscribe(
        (resultUpdate) => {
          this.scheduleService.reloadSchedule(new Date());
          this.snackbarService.openSuccessSnackBar(`Agendamento atualizado com sucesso`);
          this.customerRecordService.reloadCustomerRecordSubject.next();
        },
        (error) => {
          this.scheduleService.reloadSchedule(new Date());
          this.snackbarService.openErrorSnackBar('atualizar');
        },
      );
    } else {
      this.scheduleService.postScheduling(schedule).subscribe(
        (response) => {
          this.scheduleService.reloadSchedule(new Date());
          this.snackbarService.openSuccessSnackBar(`Agendamento adicionado com sucesso`);
          this.customerRecordService.reloadCustomerRecordSubject.next();
        },
        (error) => {
          this.scheduleService.reloadSchedule(new Date());
          this.snackbarService.openErrorSnackBar('inserir');
        },
      );
    }
  }

  onDelete(customer: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '280px',
      maxWidth: '90vw',
      data: {
        confirmed: false,
      },
      position: {
        top: '90px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed && customer?.schedule_id) {
        this.dialog.closeAll();
        this.scheduleRepository.deleteScheduling(customer.schedule_id).subscribe(
          (response) => {
            this.scheduleService.reloadSchedule(new Date());
            this.snackbarService.openSuccessSnackBar('Agendamento deletado com sucesso');
          },
          (error) => {
            console.error(error);
            this.snackbarService.openErrorSnackBar('deletar');
          },
        );
      }
    });
  }
}
