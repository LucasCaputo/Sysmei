import { NgModule } from '@angular/core';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleHomeComponent } from './schedule-home/schedule-home.component';
import { SchedulingFormComponent } from './schedule-home/scheduling-form/scheduling-form.component';
import { CalendarComponent } from './schedule-home/calendar/calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { MatSelectModule } from '@angular/material/select';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { ScheduleDialogModule } from '../shared/schedule-dialog/schedule-dialog.module';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    ScheduleHomeComponent,
    CalendarComponent,
    SchedulingFormComponent,
  ],
  imports: [
    ScheduleRoutingModule,
    FullCalendarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatToolbarModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    ScheduleDialogModule,
  ],
  providers: [],
})
export class ScheduleModule {}
