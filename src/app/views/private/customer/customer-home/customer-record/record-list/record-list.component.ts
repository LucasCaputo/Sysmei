import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Scheduling } from 'src/app/shared/interfaces/scheduling.interface';

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
  @Input() data: any;

  dataSource: any;
  columnsToDisplay = ['data', 'titulo', 'valor'];

  expandedElement = [];

  constructor() {
    console.log('entrourecord');
  }

  ngOnInit(): void {
    this.dataSource = [];

    this.data?.forEach((e: any) => {
      let data = `${e.start.slice(8, 10)}-${e.start.slice(
        5,
        7
      )}-${e.start.slice(2, 4)}`;
      console.log(e);

      this.dataSource.push({
        data,
        titulo: e.title.slice(0, 20),
        valor: e.valor || 'R$',
        description: e.detalhes || 'Sem observações',
      });
    });

    console.log(this.dataSource);
  }

  ngAfterViewInit() {}
}
