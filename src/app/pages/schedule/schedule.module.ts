import { NgModule } from '@angular/core';

import { CalendarComponent } from './components/calendar/calendar.component';
import { SchedulingFormComponent } from './components/scheduling-form/scheduling-form.component';
import { ScheduleRoutingModule } from './schedule-routing.module';

import { MatSelectModule } from '@angular/material/select';
import { FullCalendarModule } from '@fullcalendar/angular';


import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { CalendarNaviagtionComponent } from './components/calendar-naviagtion/calendar-naviagtion.component';
import { NgxMaskDirective } from 'ngx-mask';
import { ScheduleHeaderComponent } from './components/schedule-header/schedule-header.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CalendarComponent,
    SchedulingFormComponent,
    CalendarNaviagtionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    FullCalendarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    SharedModule,
    NgxMaskDirective,
    MatSidenavModule,
    MatListModule,
    ScheduleHeaderComponent,
    HeaderComponent,
    MenuComponent,
    MatDialogModule
  ],
  providers: [],
})
export class ScheduleModule { }
