import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scheduling } from 'src/app/shared/interfaces/scheduling.interface';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CustomerService } from '../../../customer.service';

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

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.dataSource = [];

    if ((this.data = [])) {
      let id = this.route.snapshot.params['id'];
      this.customerService.getCustomerRecord(id).subscribe(
        (response) => {
          this.data = response;

          this.data?.forEach((e: any) => {
            let data = `${e.start.slice(8, 10)}-${e.start.slice(
              5,
              7
            )}-${e.start.slice(2, 4)}`;

            this.dataSource.push({
              data,
              titulo: e.title.slice(0, 20),
              valor: e.valor || 'R$',
              description: e.detalhes || 'Sem observações',
            });
          });

          this.loading = false;
          return;
        },
        (erro) => {
          console.log(erro);
        }
      );
    } else {
      this.data?.forEach((e: any) => {
        let data = `${e.start.slice(8, 10)}-${e.start.slice(
          5,
          7
        )}-${e.start.slice(2, 4)}`;

        this.dataSource.push({
          data,
          titulo: e.title.slice(0, 20),
          valor: e.valor || 'R$',
          description: e.detalhes || 'Sem observações',
        });
      });
      this.loading = false;
    }
  }

  ngAfterViewInit() {}
}
