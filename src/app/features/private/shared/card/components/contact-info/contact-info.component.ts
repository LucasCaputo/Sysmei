import { Component, Input, OnInit } from '@angular/core';
import { Info } from './interface/info';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit {
  @Input() info: any | undefined;

  constructor() {}

  ngOnInit(): void {}
}
