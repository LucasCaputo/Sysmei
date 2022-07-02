import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Scheduling } from '../../../../../shared/interfaces/scheduling.interface';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleDialogComponent } from '../../../shared/dialogs/schedule-dialog/schedule-dialog.component';
import { CustomerRepository } from 'src/app/repository/services/customer/customer.repository';
import {
  CustomerResponse, 
  DocumentsUrl,
} from 'src/app/repository/intefaces/customer-response';
import { OpenPhotoComponent } from '../open-photo/open-photo.component';

@Component({
  selector: 'app-customer-record',
  templateUrl: './customer-record.component.html',
  styleUrls: ['./customer-record.component.scss'],
  animations: [
    trigger('enter', [
      state(
        'void',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      transition(':enter', [
        animate(
          '500ms ease-in-out',
          style({
            height: '*',
            overflow: 'hidden',
          })
        ),
      ]),
      //element being removed from DOM.
      transition(':leave', [
        animate(
          '500ms ease-in-out',
          style({
            height: '0px',
            overflow: 'hidden',
          })
        ),
      ]),
    ]),
  ],
})
export class CustomerRecordComponent implements OnInit {
  id = 0;
  data: CustomerResponse | undefined;
  loading = false;

  tabSelected = 0;

  photos: any | undefined;

  edit = false;

  eventsSubject: Subject<void> = new Subject<void>();

  records: Scheduling | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerRepository: CustomerRepository,
    private snackbarService: SnackbarService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  emitEventToChild() {
    this.eventsSubject.next();

    setTimeout(() => {
      this.edit = false;
    }, 1000);
  }

  test(tabSelected: number) {
    this.tabSelected = tabSelected;
  }

  ngOnInit(): void {
    this.populate();
  }

  populate() {
    this.loading = true;
    this.id = this.route.snapshot.params['id'];
    this.customerRepository.getCustomerId(this.id).subscribe(
      (response) => {
        this.data = response;
        this.photos = response.documentsUrl;
      },
      (error) => {
        this.router.navigate(['/clientes']);
        this.snackbarService.openSnackBar('Tivemos um erro', 'X', true);
      },
      () => {
        this.loading = false;
      }
    );

    this.customerRepository.getCustomerRecord(this.id).subscribe(
      (response) => {
        this.records = response;
      },
      (erro) => {
        console.log(erro);
      }
    );
  }

  inputFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const foto = event.target.files[0];

      const formData = new FormData();
      formData.append('file', foto);

      this.customerRepository.postFile(this.id, formData).subscribe(
        (result) => {
          this.customerRepository.getCustomerId(this.id).subscribe((result) => {
            console.log(result);
            this.photos = result.documentsUrl;
          });
        },
        (error) => {}
      );
    }
  }

  onOpenPhoto(photo: string) {
    const dialogRef = this.dialog.open(OpenPhotoComponent, {
      data: photo,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }

  addSchedule() {
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.populate();
    });
  }
}
