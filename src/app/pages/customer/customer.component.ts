import { Component, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { CustomerDialogComponent } from 'src/app/shared/components/dialogs/customer-dialog/customer-dialog.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SharedInputModule } from 'src/app/shared/components/inputs/shared-input.module';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
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
  customerList$ = this.customerService.customers$.pipe(
    tap((result) => {
      this.viewPortService.screenSize$.subscribe((size) => {
        if (result.length && size !== 'mobile') {
          this.selectedCustomerId.set(result[0].id);
        }
      });
    }),
  );

  searchform = this.formBuilder.group({
    search: '',
  });

  selectedCustomerId = signal(0);

  constructor(
    public readonly dialog: MatDialog,
    public readonly viewPortService: ViewportService,
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) {
    if (this.customerService.formattedCustomerList) {
      this.customerList$ = of(this.customerService.formattedCustomerList);
      this.selectedCustomerId.set(this.customerService.customers[0].id);
    }
  }

  openDialog(dataInfo: any) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      position: {
        top: '90px',
      },
      data: dataInfo,
    });
  }

  navigateToCustomerDetails(customer: any) {
    this.viewPortService.screenSize$.pipe(first()).subscribe((size) => {
      if (customer.id) {
        if (size === 'mobile') {
          this.router.navigate([`clientes/ficha/${customer.id}`]);
        } else {
          this.selectedCustomerId.set(customer.id);
        }
      }
    });
  }
}
