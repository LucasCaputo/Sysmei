import { NgModule } from '@angular/core';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { SchedulingFormComponent } from './components/scheduling-form/scheduling-form.component';
import { CalendarComponent } from './components/calendar/calendar.component';

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
import { ScheduleDialogModule } from '../shared/dialogs/schedule-dialog/schedule-dialog.module';
import { MenuModule } from '../shared/menu/menu.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [CalendarComponent, SchedulingFormComponent],
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
    MenuModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
})
export class ScheduleModule {}
