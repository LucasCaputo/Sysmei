import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ScheduleRepository } from 'src/app/repository/services/schedule/schedule.repository';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { AutocompleteOptions } from './interfaces/autocomplete-options';
import { CustomerData } from './interfaces/customer-data';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss'],
})
export class ScheduleDialogComponent implements OnInit {
  loading = false;
  user = this.authService.getUser();
  filteredOptions: Observable<Array<AutocompleteOptions>>;

  form!: UntypedFormGroup;

  customerData: Array<CustomerData> = [];

  customer: any;
  isDisabled = true;

  customerControl = new UntypedFormControl();

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private scheduleRepository: ScheduleRepository,
    private snackbarService: SnackbarService,
    private utilService: UtilsService,
  ) {
    this.filteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      allDay: '',
      detalhes: '',
      end: '',
      login_usuario: '',
      paciente: '',
      pagamento: '',
      start: '',
      status: null,
      title: '',
      valor: null,
    });

    this.populate();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.form.controls.title.dirty;
      // this.myInput?.nativeElement.focus();
    }, 300);
  }

  populate() {
    this.customerService.$customers.subscribe((result) => {
      this.customerData = result;
    });
  }

  private _filter(value: string) {
    return this.customerData.filter((option) => option.text.includes(value));
  }

  public displayCustomer(option: any) {
    if (option) {
      return `${option.nome} - (${option.telefone1.slice(
        0,
        2,
      )}) ${option.telefone1.slice(2, 3)} ${option.telefone1.slice(
        3,
        7,
      )}-${option.telefone1.slice(7, 11)}`;
    }

    return option;
  }

  save() {
    if (this.form.valid) {
      this.scheduleRepository.postScheduling(this._formatRequest()).subscribe(
        (response) => {
          console.log(response, 'response schedule');

          this.snackbarService.openSnackBar(
            `Cadastrado com Sucesso!`,
            'X',
            false,
          );

          this.dialog.closeAll();
        },
        (error) => {
          console.log(error);
          this.snackbarService.openSnackBar(
            `Tivemos um erro no cadastro, tente novamente`,
            'X',
            true,
          );
        },
      );
    } else {
      this.snackbarService.openSnackBar(
        `Preencha os campos obrigatórios`,
        'X',
        true,
      );
      // this.myInput1?.nativeElement.focus();
      // this.myInput2?.nativeElement.focus();
      // this.myInput3?.nativeElement.focus();
      // this.myInput4?.nativeElement.focus();
      // this.myInput?.nativeElement.focus();
    }
  }

  _formatRequest() {
    const date = new Date(this.form.value.allDay).toISOString() + '0';

    let clearDate = this.utilService.clearStringData(date);

    let split = clearDate.split(' ');

    let start = `${split[0]} ${this.form.value.start}`;
    let end = `${split[0]} ${this.form.value.end}`;

    let request = {
      allDay: split[0],
      detalhes: this.form.value.detalhes,
      end,
      login_usuario: this.user?.login,
      paciente_id: this.customer.id,
      prestador_id: 1,
      pagamento: this.form.value.pagamento,
      start,
      status: true,
      title: this.form.value.title,
      valor: parseInt(this.form.value.valor),
    };

    return request;
  }
}
