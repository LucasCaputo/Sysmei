import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-home',
  templateUrl: './schedule-home.component.html',
  styleUrls: ['./schedule-home.component.scss'],
})
export class ScheduleHomeComponent implements OnInit {
  valorDoContador = 10;

  constructor() {}

  ngOnInit(): void {}

  novoValorNoContador(valor: number) {
    this.valorDoContador = valor;
    console.log(valor);
  }
}
