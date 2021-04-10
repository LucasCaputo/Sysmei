import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  public innerWidth: any;
  constructor() {}

  ngOnInit(): void {}

  size() {
    this.innerWidth = window.innerWidth;
    return this.innerWidth;
  }
}
