import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomerResponse } from 'src/app/repository/intefaces/customer-response';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { CustomerDialogComponent } from 'src/app/shared/components/dialogs/customer-dialog/customer-dialog.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { SharedPipesModule } from 'src/app/shared/shared-pipes.module';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSidenavModule, CardComponent, MatListModule, SharedPipesModule, MatIconModule, HeaderComponent, MatFormFieldModule, MenuComponent, MatInputModule]

})
export class CustomerComponent implements OnInit {
  getList: Array<any> = [];
  customerList: Array<any> = [];
  user = this.authService.getUser();

  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>;

  search = '';

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngAfterViewInit() {
    fromEvent(this.searchBox?.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement;
        this.search = target.value;
      });
  }

  /** Observable da lista de clientes */
  private getCustomers(): void {
    this.customerService.$customers.subscribe(
      (result: Array<CustomerResponse>) => {
        this.customerList = result;
      },
    );
  }

  openDialog(dataInfo: any) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      position: {
        top: '70px'
      },
      data: dataInfo,
    });
  }

  checklistContent(list: any, letter: string) {
    const found = list.find((element: any) => element.inicial == letter);

    if (found) {
      return true;
    }

    return false;
  }

  navigateToCustomerDetails(customer: any) {
    this.router.navigate([`clientes/ficha/${customer.id}`]);
  }
}
