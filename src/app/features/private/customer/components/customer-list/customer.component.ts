import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomerResponse } from 'src/app/repository/intefaces/customer-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerDialogComponent } from '../../../shared/dialogs/customer-dialog/customer-dialog.component';
import { CustomerService } from '../../../shared/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  getList: Array<any> = [];
  customerList: Array<any> = [];
  
  user = this.authService.getUser();

  @ViewChild('searchBox')
  searchBox!: ElementRef<HTMLInputElement>;

  search = '';

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {}

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
        this.customerList = result
      }
    );
  }

  openDialog(dataInfo: any) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
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
}
