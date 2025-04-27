import { Component, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { first, map, tap, withLatestFrom } from 'rxjs/operators';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { CustomerDialogComponent } from 'src/app/shared/components/dialogs/customer-dialog/customer-dialog.component';
import { SchedulingDialogComponent } from 'src/app/shared/components/dialogs/scheduling-dialog/scheduling-dialog.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { CustomerResponse } from 'src/app/shared/interfaces/customer-response';
import { CustomerRecordService } from 'src/app/shared/services/customer/customer-record.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ViewportService } from 'src/app/shared/services/viewport.service';
import { SharedPipesModule } from 'src/app/shared/shared-pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerRecordComponent } from '../customer-record/customer-record.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    SharedInputModule,
    MatSidenavModule,
    CardComponent,
    MatListModule,
    SharedPipesModule,
    HeaderComponent,
    MenuComponent,
    CustomerRecordComponent,
  ],
})
export class CustomerComponent {
  customerList$ = this.customerService.searchCustomer$.pipe(
    withLatestFrom(this.viewPortService.screenSize$),
    tap(([result, size]) => {
      if (result.length && size !== 'mobile') {
        this.customerRecordService.setCustomerRecordId(result[0].id);
      }
    }),
    map(([result]) => result),
  );

  searchform = this.formBuilder.group({
    search: '',
  });

  selectedCustomerId = this.customerRecordService.customerId;

  selectedTab = signal(0);

  inputFile = signal(0);

  constructor(
    public readonly dialog: MatDialog,
    public readonly viewPortService: ViewportService,
    private readonly customerService: CustomerService,
    private readonly customerRecordService: CustomerRecordService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private utilsService: UtilsService,
  ) {}

  public openCustomerDialog(dataInfo: any) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      position: {
        top: '90px',
      },
      data: dataInfo,
    });
  }

  private openScheduleDialog(dataInfo: any) {
    const dialogSize = this.utilsService.dialogSize();

    this.dialog.open(SchedulingDialogComponent, {
      ...dialogSize,
      data: dataInfo,
    });
  }

  public navigateToCustomerDetails(customer: CustomerResponse) {
    this.viewPortService.screenSize$.pipe(first()).subscribe((size) => {
      if (customer.id) {
        if (customer.id !== this.customerRecordService.getCustomerRecordId()) {
          this.customerRecordService.setCustomerRecordId(customer.id);
          this.customerRecordService.reloadCustomerRecordSubject.next();
        }
        if (size === 'mobile') {
          this.router.navigate([`clientes/ficha/${customer.id}`]);
        }
      }
    });
  }

  public setSelectedTab(tabSelected: number): void {
    this.selectedTab.set(tabSelected);
  }

  public openDialog(): void {
    switch (this.selectedTab()) {
      case 0:
        this.openCustomerDialog({
          nome: '',
          telefones: [{ id: 0, numero: '' }],
          email: '',
        });
        break;

      case 1:
        this.openScheduleDialog({ customer: { id: this.customerRecordService.getCustomerRecordId() } });

        break;

      case 2:
        console.log('TODO -> implement upload');
        break;

      default:
        break;
    }
  }

  inputFileChange(event: any) {
    this.inputFile.set(event);
  }
}
