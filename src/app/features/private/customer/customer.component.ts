import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomerResponse } from 'src/app/repository/intefaces/customer-response';
import { CustomerRepository } from 'src/app/repository/services/customer/customer.repository';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CustomerDialogComponent } from '../shared/dialogs/customer-dialog/customer-dialog.component';
import { CustomerService } from '../shared/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  getList: Array<any> = [];
  customerList: Array<CustomerResponse> = [];
  letters: Array<string> = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  user = this.authService.getUser();

  @ViewChild('searchBox')
  searchBox!: ElementRef<HTMLInputElement>;

  search = '';

  constructor(
    private customerRepository: CustomerRepository,
    private customerService: CustomerService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
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
        this.formatContacts(result);
      }
    );
  }

  formatContacts(list: Array<CustomerResponse>) {
    this.getList = [];
    this.customerList = [];

    this.getList.push(list);
    this.getList[0].sort((a: any, b: any) => {
      if (a.nome < b.nome) {
        return -1;
      } else {
        return true;
      }
    });

    for (let i = 0; i < this.letters.length; i++) {
      let letter = this.letters[i];

      this.getList[0].forEach((element: any, index: number) => {
        if (
          letter == element.nome[0] ||
          letter.toLowerCase() == element.nome[0]
        ) {
          if (index == 0) {
            this.customerList.push({
              inicial: letter,
              isFirstLetter: true,
              ...element,
            });
          } else {
            this.customerList.push({
              inicial: letter,
              isFirstLetter: false,
              ...element,
            });
          }
        }
      });
    }
  }

  openDialog(dataInfo: any) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: dataInfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.id) {
        this.customerRepository.updateCustomer(result, result.id).subscribe(
          (response) => {
            this.customerService.searchCustomerList();
            this.getCustomers();
            this.snackbarService.openSnackBar(
              `Parabéns! usuário ${result.nome.toUpperCase()} atualizado com sucesso`,
              'X',
              false
            );
          },
          (error) => {
            this.snackbarService.openSnackBar(
              `Tivemos um erro na atualização, tente novamente`,
              'X',
              true
            );
          }
        );
        return;
      }
      if (result) {
        this.customerRepository.postCustomer(result).subscribe(
          (response) => {
            this.customerService.searchCustomerList();
            this.getCustomers();
            this.snackbarService.openSnackBar(
              `Parabéns! usuário ${result.nome.toUpperCase()} cadastrado com sucesso`,
              'X',
              false
            );
          },
          (error) => {
            this.snackbarService.openSnackBar(
              `Tivemos um erro no cadastro, tente novamente`,
              'X',
              true
            );
          }
        );
      }
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
