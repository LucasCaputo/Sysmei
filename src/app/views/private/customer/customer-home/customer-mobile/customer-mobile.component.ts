import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerResponse } from '../../customer.interface';
import { CustomerService } from '../../customer.service';

import { CustomerFormComponent } from '../customer-form/customer-form.component';

export interface Section {
  name: string;
  updated: string;
  email: string;
}

@Component({
  selector: 'app-customer-mobile',
  templateUrl: './customer-mobile.component.html',
  styleUrls: ['./customer-mobile.component.scss'],
})
export class CustomerMobileComponent implements OnInit {
  customerList: CustomerResponse[] = [];
  user = this.authService.getUser();

  THUMBUP_ICON = `
    <svg width="682" height="682" viewBox="0 0 682 682" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M567.166 113.896C507.349 54.0097 427.798 21.0146 343.049 20.9795C168.415 20.9795 26.2881 163.102 26.2179 337.783C26.1944 393.623 40.7817 448.132 68.5085 496.179L23.5603 660.354L191.517 616.296C237.796 641.541 289.898 654.844 342.92 654.86H343.053C517.667 654.86 659.809 512.725 659.876 338.037C659.911 253.377 626.986 173.779 567.166 113.896ZM343.049 601.354H342.939C295.689 601.334 249.347 588.635 208.91 564.647L199.299 558.938L99.6305 585.084L126.233 487.91L119.97 477.947C93.609 436.019 79.689 387.559 79.7124 337.803C79.7671 192.612 197.902 74.4897 343.154 74.4897C413.492 74.5131 479.611 101.939 529.328 151.715C579.045 201.491 606.408 267.652 606.385 338.017C606.323 483.219 488.196 601.354 343.049 601.354V601.354ZM487.493 404.128C479.579 400.163 440.656 381.018 433.398 378.372C426.147 375.73 420.863 374.415 415.591 382.337C410.311 390.259 395.142 408.093 390.522 413.373C385.901 418.657 381.289 419.321 373.371 415.356C365.453 411.395 339.946 403.032 309.706 376.062C286.175 355.071 270.288 329.147 265.667 321.225C261.055 313.295 265.628 309.424 269.141 305.069C277.71 294.427 286.292 283.27 288.93 277.99C291.572 272.706 290.249 268.082 288.266 264.121C286.292 260.16 270.46 221.194 263.864 205.338C257.433 189.908 250.912 191.992 246.05 191.75C241.437 191.52 236.157 191.473 230.877 191.473C225.601 191.473 217.024 193.452 209.765 201.381C202.51 209.307 182.062 228.456 182.062 267.422C182.062 306.388 210.428 344.031 214.385 349.315C218.343 354.599 270.21 434.56 349.62 468.846C368.508 477.01 383.252 481.877 394.752 485.525C413.718 491.551 430.971 490.7 444.614 488.663C459.825 486.388 491.447 469.51 498.05 451.02C504.645 432.526 504.645 416.679 502.662 413.373C500.688 410.072 495.408 408.093 487.493 404.128V404.128Z" fill="black"/>
</svg>

  
`;

  folders: Section[] = [
    {
      name: 'Ana',
      updated: '1/1/16',
      email: 'soufoda@gmail.com',
    },
    {
      name: 'Analine',
      updated: '1/17/16',
      email: 'soufoda@gmail.com',
    },
    {
      name: 'Analice',
      updated: '1/28/16',
      email: 'soufoda@gmail.com',
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itisacccsdcvsdvsavsadvsavsvsavsavsavsadvsavnerary',
      updated: '2/20/16',
      email: 'soufoda@gmail.com',
    },
    {
      name: 'Kitchen Remodel',
      updated: '1/18/16',
      email: 'soufoda@gmail.com',
    },
    {
      name: 'Kitchen Remodel',
      updated: '1/18/16',
      email: 'soufoda@gmail.com',
    },
  ];
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private authService: AuthService,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('icon.svg')
    );
    iconRegistry.addSvgIconLiteral(
      'thumbs-up',
      sanitizer.bypassSecurityTrustHtml(this.THUMBUP_ICON)
    );
  }

  ngOnInit(): void {
    this.customerService.getCustomer(this.user).subscribe(
      (response) => (this.customerList = response),
      (error) => {
        alert(error.error.message);
        console.log('caiu aqui');
        this.authService.logout();
        this.router.navigate(['login']);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService.postCustomer(result).subscribe(
          (response) => {
            this.customerService.getCustomer(this.user).subscribe(
              (response) => (this.customerList = response),
              (error) => {
                alert(error.error.message);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
