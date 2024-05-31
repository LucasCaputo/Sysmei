import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ScheduleFormatResponse } from 'src/app/repository/intefaces/schedule-response';
import { SharedModule } from 'src/app/shared/shared.module';
import { BadgeComponent } from '../../card/components/badge/badge.component';
import { ContactInfoComponent } from '../../card/components/contact-info/contact-info.component';
import { WhatsappIconComponent } from '../../whatsapp-icon/whatsapp-icon.component';
import { SchedulingFormComponent } from '../scheduling-form/scheduling-form.component';

@Component({
  selector: 'app-agenda-status',
  standalone: true,
  imports: [SharedModule, BadgeComponent, ContactInfoComponent, MatSelectModule, WhatsappIconComponent],
  templateUrl: './agenda-status.component.html',
  styleUrls: ['./agenda-status.component.scss']
})
export class AgendaStatusComponent {
  public constructor(@Inject(MAT_DIALOG_DATA)
  public data: ScheduleFormatResponse,
    public dialog: MatDialog,) {
    console.log(data)
  }

  /** Edita um agendamento */
  public onEdit() {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        ...this.data,
        hasDelete: false,
      },
      position: {
        top: '70px'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.dialog.closeAll();
    });
  }

}
