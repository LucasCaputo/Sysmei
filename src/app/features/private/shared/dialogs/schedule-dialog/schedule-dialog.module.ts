import { NgModule } from '@angular/core';

import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
// import { NgxMaskModule } from 'ngx-mask';
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
    // NgxMaskModule.forRoot(),
  ],
  exports: [ScheduleDialogComponent],
})
export class ScheduleDialogModule {}
