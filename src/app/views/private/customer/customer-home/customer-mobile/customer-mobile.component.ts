import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CustomerResponse } from '../../customer.interface';
import { CustomerService } from '../../customer.service';

import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customer-mobile',
  templateUrl: './customer-mobile.component.html',
  styleUrls: ['./customer-mobile.component.scss'],
})
export class CustomerMobileComponent implements OnInit {
  getList: Array<any> = [];
  customerList: Array<any> = [];
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
  loading = false;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const hasLocalStorage = localStorage.getItem('customer');

    if (hasLocalStorage) {
      this.formatContacts(JSON.parse(hasLocalStorage));
    } else {
      this.customerService.getCustomer(this.user).subscribe(
        (response) => {
          if (response.length) {
            this.formatContacts(response);
            this.localStorageService.setCustomer(response);
          }
          this.loading = false;
        },
        (error) => {
          alert('Seu token venceu, faça login novamente');
          this.authService.logout();
          this.router.navigate(['login']);
          this.loading = false;
        }
      );
    }
  }

  ngAfterViewInit() {
    fromEvent(this.searchBox?.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement;
        this.search = target.value;
      });
  }

  getCustomers(isChangeDatabese: boolean) {
    this.loading = true;
    const hasLocalStorage = this.localStorageService.getCustomer();
    if (hasLocalStorage && !isChangeDatabese) {
      this.formatContacts(hasLocalStorage);
    } else {
      this.customerService.getCustomer(this.user).subscribe(
        (response) => {
          if (response.length) {
            this.formatContacts(response);
            this.localStorageService.setCustomer(response);
          }
          this.loading = false;
        },
        (error) => {
          alert('Seu token venceu, faça login novamente');
          this.authService.logout();
          this.router.navigate(['login']);
          this.loading = false;
        }
      );
    }
  }

  formatContacts(list: CustomerResponse) {
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
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: dataInfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.id) {
        this.customerService.updateCustomer(result, result.id).subscribe(
          (response) => {
            this.getCustomers(true);
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
        this.customerService.postCustomer(result).subscribe(
          (response) => {
            this.getCustomers(true);
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
      } else {
        let customerLocalStorage = localStorage.getItem('customer');

        if (!customerLocalStorage) {
          this.getCustomers(true);
        } else return;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  checklistContent(list: any, letter: string) {
    const found = list.find((element: any) => element.inicial == letter);

    if (found) {
      return true;
    }

    return false;
  }
}
