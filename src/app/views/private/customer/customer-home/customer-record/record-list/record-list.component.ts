import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  data: string;
  titulo: string;
  valor: string;
  description: string;
}

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class RecordListComponent implements OnInit {
  dataSource: PeriodicElement[] = [
    {
      data: '28-04-21',
      titulo: 'Luzes Loiras',
      valor: 'R$ 335,00',
      description: `Luzes loiras coloração número 7.1 marca Mirra`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
    {
      data: '28-04-21',
      titulo: 'Corte XPOTS',
      valor: 'R$ 135,00',
      description: `Hydrogen is a chemical element with valor H and atomic number 1. With a standard
          atomic titulo of 1.008, hydrogen is the lightest element on the periodic table.`,
    },
  ];
  columnsToDisplay = ['data', 'titulo', 'valor'];

  expandedElement: PeriodicElement[] = [];
  constructor() {}

  ngOnInit(): void {}
}
