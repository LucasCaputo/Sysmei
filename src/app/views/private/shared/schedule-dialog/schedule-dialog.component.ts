import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { CustomerService } from '../../customer/customer.service';
import { ScheduleService } from '../../schedule/schedule.service';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss'],
})
export class ScheduleDialogComponent implements OnInit {
  loading = false;
  user = this.authService.getUser();
  filteredOptions: Observable<Array<{ id: number; text: string }>>;
  scheduleDialog!: FormGroup;
  options: Array<{
    id: number;
    text: string;
    telefone1: string;
    nome: string;
  }> = [];
  customer: any;
  isDisabled = true;

  customerControl = new FormControl();

  @ViewChild('myInput') myInput: ElementRef | undefined;
  @ViewChild('myInput1') myInput1: ElementRef | undefined;
  @ViewChild('myInput2') myInput2: ElementRef | undefined;
  @ViewChild('myInput3') myInput3: ElementRef | undefined;
  @ViewChild('myInput4') myInput4: ElementRef | undefined;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private scheduleService: ScheduleService,
    private snackbarService: SnackbarService,
    private utilService: UtilsService
  ) {
    this.filteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit(): void {
    this.scheduleDialog = this.fb.group({
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
      this.myInput?.nativeElement.focus();
    }, 300);
  }

  populate() {
    const hasLocalStorage = localStorage.getItem('customer');

    if (hasLocalStorage) {
      this.formatCustomers(JSON.parse(hasLocalStorage));
    } else {
      this.loading = true;

      this.customerService.getCustomer(this.user).subscribe(
        (response) => {
          this.formatCustomers(response);
          localStorage.setItem('customer', JSON.stringify(response));
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
    }
  }

  formatCustomers(response: any) {
    response.forEach((element: any) => {
      let phone = element.telefone1;
      this.options.push({
        ...element,
        text: `${element.nome} - ${this.utilService.formatPhone(phone)}`,
      });
    });
  }

  private _filter(value: string) {
    return this.options.filter((option) => option.text.includes(value));
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

  save() {
    if (this.scheduleDialog.valid) {
      this.scheduleService.postScheduling(this._formatRequest()).subscribe(
        (response) => {
          console.log(response, 'response schedule');

          this.snackbarService.openSnackBar(
            `Cadastrado com Sucesso!`,
            'X',
            false
          );

          this.dialog.closeAll();
        },
        (error) => {
          console.log(error);
          this.snackbarService.openSnackBar(
            `Tivemos um erro no cadastro, tente novamente`,
            'X',
            true
          );
        }
      );
    } else {
      this.snackbarService.openSnackBar(
        `Preencha os campos obrigatórios`,
        'X',
        true
      );
      this.myInput1?.nativeElement.focus();
      this.myInput2?.nativeElement.focus();
      this.myInput3?.nativeElement.focus();
      this.myInput4?.nativeElement.focus();
      this.myInput?.nativeElement.focus();
    }
  }

  _formatRequest() {
    const date = new Date(this.scheduleDialog.value.allDay).toISOString() + '0';

    let clearDate = this.utilService.clearStringData(date);

    let split = clearDate.split(' ');

    let start = `${split[0]} ${this.scheduleDialog.value.start}`;
    let end = `${split[0]} ${this.scheduleDialog.value.end}`;

    let request = {
      allDay: split[0],
      detalhes: this.scheduleDialog.value.detalhes,
      end,
      login_usuario: this.user?.login,
      paciente_id: this.customer.id,
      pagamento: this.scheduleDialog.value.pagamento,
      start,
      status: true,
      title: this.scheduleDialog.value.title,
      valor: parseInt(this.scheduleDialog.value.valor),
    };

    return request;
  }
}
