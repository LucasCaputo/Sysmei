import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { CardInfo } from 'src/app/shared/components/card/interfaces/card-info';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomerResponse } from 'src/app/shared/interfaces/customer-response';
import { CustomerRecordService } from 'src/app/shared/services/customer/customer-record.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulingDialogComponent } from '../../shared/components/dialogs/scheduling-dialog/scheduling-dialog.component';
import { CustomerCompleteRegistrationComponent } from './customer-complete-registration/customer-complete-registration.component';
import { RecordListComponent } from './record-list/record-list.component';

@Component({
  selector: 'app-customer-record',
  templateUrl: './customer-record.component.html',
  styleUrls: ['./customer-record.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    CustomerCompleteRegistrationComponent,
    RecordListComponent,
    CardComponent,
  ],
})
export class CustomerRecordComponent implements OnInit {
  @Input() hasHeader: boolean = true;

  @Input()
  set customerId(value: number) {
    if (value) {
      this.customerRecordService.setCustomerRecordId(value);
      this.populate();
    }
  }

  @Input()
  set inputFile(value: any) {
    if (value) {
      this.inputFileChange(value);
    }
  }

  @Output() changeTab = new EventEmitter<number>();

  data: CustomerResponse | undefined;
  cardData!: CardInfo;
  loading = false;
  tabSelected = signal(0);
  photos: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private customerRecordService: CustomerRecordService,
    private employeeService: EmployeeService,
  ) {}

  selectedIndexChange(tabSelected: number) {
    this.tabSelected.set(tabSelected);
    this.changeTab.emit(tabSelected);
  }

  ngOnInit(): void {
    this.populate();
    if (!this.customerService.formattedCustomerList) {
      this.customerService.searchCustomer$.pipe(take(1)).subscribe();
    }

    if (!this.employeeService.employee) {
      this.employeeService.searchEmployee$.pipe(take(1)).subscribe();
    }
  }

  getCustomerId() {
    return this.route.snapshot?.params['id'] || this.customerRecordService.getCustomerRecordId();
  }

  populate() {
    this.loading = true;
    const id = this.getCustomerId();
    if (id) {
      this.customerRecordService.setCustomerRecordId(id);

      this.customerService.getCustomerId(id).subscribe(
        (response) => {
          this.data = response;
          this.photos = response.documentsUrl;

          this.cardData = {
            id: response?.id || 0,
            login_usuario: response?.login_usuario || '',
            nome: response?.nome || '',
            telefone: response?.telefone1 || '',
          };
        },
        (error) => {
          this.router.navigate(['/clientes']);
          this.snackbarService.openSnackBar('Tivemos um erro', 'X', true);
        },
        () => {
          this.loading = false;
        },
      );
    }
  }

  inputFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const customerId = this.getCustomerId();

    this.customerService
      .postFile(customerId, formData)
      .pipe(switchMap(() => this.customerService.getCustomerId(customerId)))
      .subscribe((result) => {
        if (result) {
          this.photos = result.documentsUrl;
        }
      });
  }

  addSchedule() {
    const dialogRef = this.dialog.open(SchedulingDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { customer: { id: this.customerRecordService.getCustomerRecordId() } },
      position: {
        top: '90px',
      },
    });
  }
}
