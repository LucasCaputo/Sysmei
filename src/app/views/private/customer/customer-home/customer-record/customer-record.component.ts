import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CustomerResponse } from '../../customer.interface';
import { CustomerService } from '../../customer.service';
import { Scheduling } from '../../../../../shared/interfaces/scheduling.interface';
import { MatDialog } from '@angular/material/dialog';
import { OpenPhotoComponent } from './open-photo/open-photo.component';
import { ScheduleDialogComponent } from '../../../shared/schedule-dialog/schedule-dialog.component';

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

  photos: [{ id: number; url: string }] | undefined;

  edit = false;

  eventsSubject: Subject<void> = new Subject<void>();

  records: Scheduling | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
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
    this.customerService.getCustomerId(this.id).subscribe(
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

    this.customerService.getCustomerRecord(this.id).subscribe(
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

      this.customerService.postFile(this.id, formData).subscribe(
        (result) => {
          this.customerService.getCustomerId(this.id).subscribe((result) => {
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
