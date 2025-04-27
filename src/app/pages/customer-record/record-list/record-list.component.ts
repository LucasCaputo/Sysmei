import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SchedulingDialogComponent } from 'src/app/shared/components/dialogs/scheduling-dialog/scheduling-dialog.component';
import { CustomerRecordService } from 'src/app/shared/services/customer/customer-record.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
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
    private utilsService: UtilsService,
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
    const dialogSize = this.utilsService.dialogSize();
    this.dialog.open(SchedulingDialogComponent, {
      ...dialogSize,
      data: this.scheduleService.formatScheduleResponse([el])[0],
    });
  }
}
