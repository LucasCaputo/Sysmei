import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CustomerResponse } from '../../customer.interface';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer-record',
  templateUrl: './customer-record.component.html',
  styleUrls: ['./customer-record.component.scss'],
})
export class CustomerRecordComponent implements OnInit {
  id = 0;
  data: CustomerResponse | undefined;
  edit = false;
  loading = false;

  photos: [{ id: number; url: string }] | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private snackbarService: SnackbarService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
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
        console.log(response);
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
}
