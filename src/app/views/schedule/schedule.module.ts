import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleHomeComponent } from './schedule-home/schedule-home.component';
import { SchedulingFormComponent } from './schedule-home/scheduling-form/scheduling-form.component';
import { HttpClientModule } from '@angular/common/http';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {MatDialogModule} from '@angular/material/dialog';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])


@NgModule({
  declarations: [ScheduleHomeComponent, SchedulingFormComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    MatDialogModule
   
  ],
  providers: [
    
  ]
})
export class ScheduleModule { }