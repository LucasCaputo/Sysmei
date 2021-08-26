import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { ScheduleDialogComponent } from './schedule-dialog.component';

@NgModule({
  declarations: [ScheduleDialogComponent],
  imports: [
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatToolbarModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [ScheduleDialogComponent],
})
export class ScheduleDialogModule {}
