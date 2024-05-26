import { NgModule } from '@angular/core';

import { CalendarComponent } from './components/calendar/calendar.component';
import { SchedulingFormComponent } from './components/scheduling-form/scheduling-form.component';
import { ScheduleRoutingModule } from './schedule-routing.module';

import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { CalendarNaviagtionComponent } from './components/calendar-naviagtion/calendar-naviagtion.component';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { NgxMaskDirective } from 'ngx-mask';
import { ScheduleHeaderComponent } from './components/schedule-header/schedule-header.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   timeGridPlugin,
//   listPlugin,
//   interactionPlugin,
// ]);

@NgModule({
  declarations: [
    CalendarComponent,
    SchedulingFormComponent,
    CalendarNaviagtionComponent,
  ],
  imports: [
    ReactiveFormsModule,
    ScheduleRoutingModule,
    FullCalendarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    SharedModule,
    NgxMaskDirective,
    MenuModule,
    MatSidenavModule,
    MatListModule,
    ScheduleHeaderComponent,
    HeaderComponent,
  ],
  providers: [],
})
export class ScheduleModule {}
