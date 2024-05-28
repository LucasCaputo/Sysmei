import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CustomerResponse } from 'src/app/repository/intefaces/customer-response';
import { CustomerRepository } from 'src/app/repository/services/customer/customer.repository';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SchedulingFormComponent } from '../../../schedule/components/scheduling-form/scheduling-form.component';
import { Scheduling } from 'src/app/shared/interfaces/scheduling.interface';
import { CardInfo } from 'src/app/shared/components/card/interfaces/card-info';

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
  id = 0;
  data: CustomerResponse | undefined;
  cardData!: CardInfo
  loading = false;

  tabSelected = 0;

  photos: any | undefined;

  edit = false;

  eventsSubject: Subject<void> = new Subject<void>();

  records: Array<Scheduling> | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerRepository: CustomerRepository,
    private snackbarService: SnackbarService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

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
    this.populate();
    console.log(this.route.snapshot.params['id']);
  }

  populate() {
    this.loading = true;
    this.id = this.route.snapshot.params['id'];
    this.customerRepository.getCustomerId(this.id).subscribe(
      (response) => {
        this.data = response;
        this.photos = response.documentsUrl;

        this.cardData = {
          id: response?.id || 0,
          login_usuario: response?.login_usuario || '',
          nome: response?.nome || '',
          telefone: response?.telefone1 || ''
        }
      },
      (error) => {
        this.router.navigate(['/clientes']);
        this.snackbarService.openSnackBar('Tivemos um erro', 'X', true);
      },
      () => {
        this.loading = false;
      },
    );

    this.customerRepository.getCustomerRecord(this.id).subscribe(
      (response) => {
        console.log(response);

        this.records = response;
      },
      (erro) => {
        console.log(erro);
      },
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
        (error) => { },
      );
    }
  }

  // onOpenPhoto(photo: string) {
  //   const dialogRef = this.dialog.open(OpenPhotoComponent, {
  //     data: photo,
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     console.log(result);
  //   });
  // }

  addSchedule() {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: { customer: { id: parseInt(this.route.snapshot.params['id']) } },
      position: {
        top: '70px'
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);

      if (result == 'close') return;

      if (result.title) {
        this.records = [];

        setTimeout(() => {
          this.customerRepository.getCustomerRecord(this.id).subscribe(
            (response) => {
              this.records = response;
              console.log(response);
            },
            (erro) => {
              console.log(erro);
            },
          );
        }, 8000);
      }
    });
  }

  /**
   * Verifica o movimento do usuário para esquerda ou direita e emite evento
   * @param event dados do evento de arrastar
   */
  public onSwipe(event: any) {
    const x =
      Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? 'Right' : 'Left') : '';
    console.log(x, 'entrou');

    if (x === 'Right') {
      if (this.tabSelected < 2) {
        this.tabSelected++;
        console.log(this.tabSelected);

        this.selectedIndexChange(this.tabSelected);
      }
    } else if (x === 'Left') {
      if (this.tabSelected > 0) {
        this.tabSelected--;
        console.log(this.tabSelected);

        this.selectedIndexChange(this.tabSelected);
      }
    }
  }
}
