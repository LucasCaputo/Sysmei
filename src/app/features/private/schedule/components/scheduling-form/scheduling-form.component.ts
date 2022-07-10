import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmployeeResponse } from 'src/app/repository/intefaces/employee-response';
import { ScheduleResponse } from 'src/app/repository/intefaces/schedule-response';
import { ScheduleRepository } from 'src/app/repository/services/schedule/schedule.repository';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { EmployeeService } from '../../../shared/services/employee/employee.service';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { AutocompleteOptions } from './interfaces/autocomplete-options';
import { CustomerData } from './interfaces/customer-data';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
})
export class SchedulingFormComponent implements OnInit {
  
  user = this.authService.getUser();

  form!: FormGroup;
  
  customerControl = new FormControl();

  customerData: Array<CustomerData> = this.customerService.formattedCustomerList;
  employeeData: Array<EmployeeResponse> = this.employeeService.employee;

  hiddenEmployee = false;

  filteredOptions: Observable<Array<AutocompleteOptions>>;

  @ViewChild('myInput') myInput: ElementRef | undefined;

  constructor(
    private scheduleService: ScheduleService,
    private utilsService: UtilsService,
    private customerService: CustomerService,
    private scheduleRepository: ScheduleRepository,
    private employeeService: EmployeeService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      end: Date;
      start: Date;
      title: string;
      extendedProps: {
        login_usuario: string;
        paciente_id: number;
        status: number;
        prestador_id: number;
        valor: number;
        detalhes: string;
        pagamento: string;
        customer: any;
      };
    },
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
  ) {
    this.filteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit(): void {

    let end = '';
    let start = '';

    if(this.data?.start && this.data?.end) {
      start = `${('0'+this.data?.start?.getHours())?.slice(-2)}:${('0'+this.data?.start?.getMinutes())?.slice(-2)}`
      end = `${('0'+this.data?.end?.getHours())?.slice(-2)}:${('0'+this.data?.end?.getMinutes())?.slice(-2)}`
    }
    
    this.form = this.formBuilder.group({
      id: this.data?.id,
      allDay: this.data?.start || '',
      start,
      end,
      login_usuario: this.user?.login,
      customer: this.customerData.find((e)=> e.id === this.data?.extendedProps?.paciente_id),
      status: 0,  
      title: '',
      valor: this.data?.extendedProps?.valor || '',
      pagamento: this.data?.extendedProps?.pagamento || '',
      detalhes: this.data?.extendedProps?.detalhes || '',
      employee: this.employeeData.find((e)=> e.id === this.data?.extendedProps?.prestador_id) || this.employeeData[0],
    });

    if(this.data?.title) {
      this.form.controls.title.setValue(this.data?.title?.replace(` - ${this.form?.value?.customer?.nome}`, ''))
    }

    if(this.employeeData?.length > 1){
      this.hiddenEmployee = true 
      console.log(this.hiddenEmployee);
      
    }

  }

  ngAfterViewInit() {
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
      option.text.toLowerCase().includes(filterValue)
    );
  }

  displayCustomer(option: any) {
    return option?.text || ''
  }

  /** Edita objeto como back espera receber */
  private formatRequestPayload(result: any): ScheduleResponse {
  
    const datePayload = this.utilsService.formatDateRequestPayload(result);

    const schedule = {
      id: result.id,
      title: result.title.replaceAll(` - ${this.form?.value?.customer?.nome}`, ''),
      start: datePayload.start,
      end: datePayload.end,
      status: 0,
      login_usuario: this.authService.getUser()?.login!,
      paciente_id: result.customer?.id,
      allDay: datePayload.allDay,
      valor: parseInt(result.valor),
      detalhes: result.detalhes,
      pagamento: result.pagamento,
      prestador_id: result.employee?.id,
    };

    return schedule
  }

  saveScheduleData() {
    const schedule = this.formatRequestPayload(this.form.value)

    if(schedule.id) {
      this.scheduleRepository
      .updateScheduling(schedule, `${schedule.id}`)
      .subscribe(
        (resultUpdate) => {
          this.scheduleService.searchScheduleList();
          this.snackbarService.openSnackBar(
            `Agendamento atualizado com sucesso`,
            'X',
            false
          );
        },  
        (error) => {
          console.log(error, 'update');
          this.snackbarService.openSnackBar(
            `Tivemos um erro para atualizar, tente novamente`,
            'X',
            true
          );
        }
      );
    } else {
      this.scheduleRepository.postScheduling(schedule).subscribe(
        (response) => {
          this.scheduleService.searchScheduleList();
          this.snackbarService.openSnackBar(
            `Agendamento adicionado com sucesso`,
            'X',
            false
          );
        },  
        (error) => {
          console.log(error);
          this.snackbarService.openSnackBar(
            `Tivemos um erro para inserir, tente novamente`,
            'X',
            true
          );
        }
      );
    }
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
      if (result?.confirmed && customer?._def?.publicId) {
        this.dialog.closeAll();
        this.scheduleRepository
          .deleteScheduling(customer._def.publicId)
          .subscribe(
            (response) => {

              this.scheduleService.searchScheduleList()
              this.snackbarService.openSnackBar(
                `Agendamento deletado com sucesso`,
                'X',
                false
              );
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
