import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { CardInfo } from 'src/app/shared/components/card/interfaces/card-info';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomerResponse } from 'src/app/shared/interfaces/customer-response';
import { Scheduling } from 'src/app/shared/interfaces/scheduling.interface';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulingFormComponent } from '../../shared/components/dialogs/scheduling-form/scheduling-form.component';
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
  animations: [
    trigger('enter', [
      state(
        'void',
        style({
          height: '0px',
          overflow: 'hidden',
        }),
      ),
      transition(':enter', [
        animate(
          '500ms ease-in-out',
          style({
            height: '*',
            overflow: 'hidden',
          }),
        ),
      ]),
      //element being removed from DOM.
      transition(':leave', [
        animate(
          '500ms ease-in-out',
          style({
            height: '0px',
            overflow: 'hidden',
          }),
        ),
      ]),
    ]),
  ],
})
export class CustomerRecordComponent implements OnInit {
  @Input() hasHeader: boolean = true;

  _customerId: undefined | number;

  @Input()
  set customerId(value: number) {
    if (value) {
      this._customerId = value;
      this.populate();
    }
  }

  data: CustomerResponse | undefined;
  cardData!: CardInfo;
  loading = false;

  tabSelected = 0;

  photos: any | undefined;

  edit = false;

  eventsSubject: Subject<void> = new Subject<void>();

  records: Array<Scheduling> | undefined;

  constructor(
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router,
    public dialog: MatDialog,
    private customerService: CustomerService,
  ) {}

  emitEventToChild() {
    this.eventsSubject.next();

    setTimeout(() => {
      this.edit = false;
    }, 1000);
  }

  selectedIndexChange(tabSelected: number) {
    this.tabSelected = tabSelected;
  }

  ngOnInit(): void {
    if (!this._customerId) {
      this.populate();
    }
  }

  getCustomerId() {
    return this.route.snapshot?.params['id'] || this._customerId;
  }

  populate() {
    this.loading = true;
    const id = this.getCustomerId();
    if (id) {
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

      this.customerService.getCustomerRecord(id).subscribe(
        (response) => {
          this.records = response;
        },
        (erro) => {
          console.error(erro);
        },
      );
    }
  }

  inputFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const foto = event.target.files[0];

      const formData = new FormData();
      formData.append('file', foto);

      this.customerService.postFile(this.getCustomerId(), formData).subscribe(
        (result) => {
          this.customerService.getCustomerId(this.getCustomerId()).subscribe((result) => {
            this.photos = result.documentsUrl;
          });
        },
        (error) => {},
      );
    }
  }

  // onOpenPhoto(photo: string) {
  //   const dialogRef = this.dialog.open(OpenPhotoComponent, {
  //     data: photo,
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     console.warn(result);
  //   });
  // }

  addSchedule() {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { customer: { id: parseInt(this.route.snapshot.params['id']) } },
      position: {
        top: '90px',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'close') return;

      if (result.title) {
        this.records = [];

        setTimeout(() => {
          this.customerService.getCustomerRecord(this.getCustomerId()).subscribe(
            (response) => {
              this.records = response;
            },
            (erro) => {
              console.error(erro);
            },
          );
        }, 8000);
      }
    });
  }
}
