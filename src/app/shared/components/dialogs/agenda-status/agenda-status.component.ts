import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ScheduleFormatResponse } from 'src/app/shared/interfaces/schedule-response';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { ScheduleRepository } from 'src/app/shared/services/service-api/schedule.repository';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SharedPipesModule } from 'src/app/shared/shared-pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BadgeComponent } from '../../card/components/badge/badge.component';
import { ContactInfoComponent } from '../../card/components/contact-info/contact-info.component';
import { WhatsappIconComponent } from '../../whatsapp-icon/whatsapp-icon.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SchedulingFormComponent } from '../scheduling-form/scheduling-form.component';

@Component({
  selector: 'app-agenda-status',
  standalone: true,
  imports: [
    SharedModule,
    BadgeComponent,
    ContactInfoComponent,
    MatSelectModule,
    WhatsappIconComponent,
    SharedPipesModule,
  ],
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
    private scheduleRepository: ScheduleRepository,
    private scheduleService: ScheduleService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
  ) { }

  /** Edita um agendamento */
  public onEdit() {
    const dialogRef = this.dialog.open(SchedulingFormComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: {
        ...this.data,
        hasDelete: false,
      },
      position: {
        top: '90px',
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
      console.log(this.data);
      if (result?.confirmed && this.data?.schedule_id) {
        this.dialog.closeAll();
        this.scheduleRepository
          .deleteScheduling(this.data.schedule_id)
          .subscribe(
            (response) => {
              this.scheduleService.searchScheduleList();
              this.snackbarService.openSnackBar(
                `Agendamento deletado com sucesso`,
                'X',
                false,
              );
            },
            (error) => {
              console.log(error);
              this.snackbarService.openSnackBar(
                `Tivemos um erro para deletar, tente novamente`,
                'X',
                true,
              );
            },
          );
      }
    });
  }

  updateStatus(status: number) {
    this.scheduleRepository
      .patchStatus({ status }, this.data.schedule_id!)
      .subscribe(
        (e) => {
          this.scheduleService.searchScheduleList();
          this.snackbarService.openSnackBar(
            `Status alterado com sucesso`,
            'X',
            false,
          );
        },
        (error) => {
          console.log(error);
          this.snackbarService.openSnackBar(
            `Tivemos um erro para alterar o status, tente novamente`,
            'X',
            true,
          );
        },
      );
  }
}
