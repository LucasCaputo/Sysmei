import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-whatsapp-icon',
  templateUrl: './whatsapp-icon.component.html',
  styleUrls: ['./whatsapp-icon.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule]

})
export class WhatsappIconComponent implements OnInit {
  THUMBUP_ICON = `<svg width="637" height="641" viewBox="0 0 637 641" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M544.166 93.8965C484.349 34.0097 404.798 1.01462 320.049 0.9795C145.415 0.9795 3.28811 143.102 3.21786 317.783C3.19445 373.623 17.7817 428.132 45.5085 476.179L0.560303 640.354L168.517 596.296C214.796 621.541 266.898 634.844 319.92 634.86H320.053C494.667 634.86 636.809 492.725 636.876 318.037C636.911 233.377 603.986 153.779 544.166 93.8965ZM320.049 581.354H319.939C272.689 581.334 226.347 568.636 185.91 544.647L176.299 538.938L76.6305 565.084L103.233 467.91L96.97 457.947C70.609 416.019 56.689 367.559 56.7124 317.803C56.7671 172.612 174.902 54.4897 320.154 54.4897C390.492 54.5131 456.611 81.9394 506.328 131.715C556.045 181.491 583.408 247.652 583.385 318.017C583.323 463.219 465.196 581.354 320.049 581.354ZM464.493 384.128C456.579 380.163 417.656 361.018 410.398 358.372C403.147 355.73 397.863 354.415 392.591 362.337C387.311 370.259 372.142 388.093 367.522 393.373C362.901 398.657 358.289 399.321 350.371 395.356C342.453 391.395 316.946 383.032 286.706 356.062C263.175 335.071 247.288 309.147 242.667 301.225C238.055 293.295 242.628 289.424 246.141 285.069C254.71 274.427 263.292 263.27 265.93 257.99C268.572 252.706 267.249 248.082 265.266 244.121C263.292 240.16 247.46 201.194 240.864 185.338C234.433 169.908 227.912 171.992 223.05 171.75C218.437 171.52 213.157 171.473 207.877 171.473C202.601 171.473 194.024 173.452 186.765 181.381C179.51 189.307 159.062 208.456 159.062 247.422C159.062 286.388 187.428 324.031 191.385 329.315C195.343 334.599 247.21 414.56 326.62 448.846C345.508 457.01 360.252 461.877 371.752 465.525C390.718 471.551 407.971 470.7 421.613 468.663C436.825 466.388 468.447 449.51 475.05 431.02C481.645 412.526 481.645 396.679 479.662 393.373C477.688 390.072 472.408 388.093 464.493 384.128Z" fill="black"/>
  </svg>
  `;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('icon.svg'),
    );
    iconRegistry.addSvgIconLiteral(
      'thumbs-up',
      sanitizer.bypassSecurityTrustHtml(this.THUMBUP_ICON),
    );
  }

  ngOnInit(): void { }
}
