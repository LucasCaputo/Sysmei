import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SchedulingFormComponent } from 'src/app/features/private/schedule/components/scheduling-form/scheduling-form.component';
import { ScheduleService } from 'src/app/features/private/shared/services/schedule/schedule.service';
import { CustomerRepository } from 'src/app/repository/services/customer/customer.repository';

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

  customerId = this.route.snapshot.params['id']
  dataSource: any;
  columnsToDisplay = ['data', 'titulo', 'valor'];

  expandedElement = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private customerRepository: CustomerRepository
  ) {}

  ngOnInit(): void {
    this.formatData()
  }
  
  formatData() {
    
    this.dataSource = [];
    this.data?.forEach((e: any) => {
      let data = `${e.start.slice(8, 10)}-${e.start.slice(
        5,
        7
      )}-${e.start.slice(2, 4)}`;

      this.dataSource.push({
        ...e,
        data,
        titulo: e.title.slice(0, 20),
        valor: e.valor || 'R$',
        description: e.detalhes || 'Sem observações',
      });
    });

  }

  click(el: any) {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      position: {
        top: '0px'
      },
      data:  this.scheduleService.formatScheduleResponse([el])[0],
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);

      if(result =='close') return
      
      if(result.title)  {
        console.log(this.customerId);
        
        this.customerId = this.route.snapshot.params['id']

        setTimeout(() => {
          this.customerRepository.getCustomerRecord(this.customerId).subscribe(
            (response) => {
              this.data = response;
              console.log(response);
              this.formatData()
              
            },
            (erro) => {
              console.log(erro);
            },
          );
        }, 8000);
        
      }
    });

    
  }
}
