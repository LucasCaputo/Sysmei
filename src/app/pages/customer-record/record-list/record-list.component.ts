import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SchedulingFormComponent } from 'src/app/shared/components/dialogs/scheduling-form/scheduling-form.component';
import { CustomerRecordService } from 'src/app/shared/services/customer/customer-record.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class RecordListComponent implements OnInit {
  customerRecordList = this.customerRecordService.customerRecord$;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private customerRecordService: CustomerRecordService,
  ) {}

  ngOnInit(): void {
    this.setCustomerId();
  }

  private setCustomerId(): void {
    const customerId = this.route.snapshot.params['id'];

    if (customerId) {
      this.customerRecordService.setCustomerRecordId(customerId);
    }
  }

  click(el: any) {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: this.scheduleService.formatScheduleResponse([el])[0],
      position: {
        top: '90px',
      },
    });
  }
}
