import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedule-home',
  templateUrl: './schedule-home.component.html',
  styleUrls: ['./schedule-home.component.scss'],
})
export class ScheduleHomeComponent implements OnInit {
  constructor( private scheduleService: ScheduleService) {}

  ngOnInit(): void {}
}
