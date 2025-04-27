import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { first } from 'rxjs/operators';
import { ScheduleFormatResponse } from 'src/app/shared/interfaces/schedule-response';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { SharedPipesModule } from 'src/app/shared/shared-pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BadgeComponent } from '../../card/components/badge/badge.component';
import { ContactInfoComponent } from '../../card/components/contact-info/contact-info.component';
import { WhatsappIconComponent } from '../../whatsapp-icon/whatsapp-icon.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SchedulingDialogComponent } from '../scheduling-dialog/scheduling-dialog.component';

@Component({
  selector: 'app-agenda-status',
  standalone: true,
  imports: [SharedModule, BadgeComponent, ContactInfoComponent, MatSelectModule, WhatsappIconComponent, SharedPipesModule],
  templateUrl: './agenda-status.component.html',
  styleUrls: ['./agenda-status.component.scss'],
})
export class AgendaStatusComponent {
  public statusForm = this.formBuilder.group({
    status: [this.data.status || 0],
  });

  public constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ScheduleFormatResponse,
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
  ) {}

  /** Edita um agendamento */
  public onEdit() {
    const dialogSize = this.utilsService.dialogSize();
    const dialogRef = this.dialog.open(SchedulingDialogComponent, {
      ...dialogSize,
      data: {
        ...this.data,
        hasDelete: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.dialog.closeAll();
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '280px',
      maxWidth: '90vw',
      data: {
        confirmed: false,
      },
      position: {
        top: '90px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed && this.data?.schedule_id) {
        this.dialog.closeAll();
        this.scheduleService.deleteScheduling(this.data.schedule_id).pipe(first()).subscribe();
      }
    });
  }

  updateStatus(status: number) {
    this.scheduleService.patchStatus({ status }, this.data.schedule_id!).pipe(first()).subscribe();
  }
}
