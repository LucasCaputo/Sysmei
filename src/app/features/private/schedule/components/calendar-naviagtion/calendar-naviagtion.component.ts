import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarViewOptions } from './calendar.navigation.options';

@Component({
  selector: 'app-calendar-naviagtion',
  templateUrl: './calendar-naviagtion.component.html',
  styleUrls: ['./calendar-naviagtion.component.scss']
})
export class CalendarNaviagtionComponent implements OnInit {

  @Input() title = ''
  @Output() action = new EventEmitter<string>();

  calendarViewOptions = CalendarViewOptions;


  constructor() { }

  ngOnInit(): void {
  }

  direction= ""
  actionIcon="timeGridWeek"

  change(action: string) {
    
    if(!(action === 'today' || action === 'next' || action === 'prev'))  {
      this.actionIcon=action;
      
    }
    this.action.emit(action);    
  }
  
  onSwipe(event:any) {
    const x = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? "Right" : "Left") : "";
        
    if(x === 'Right') {
      this.change('next')
    } else if (x === 'Left') {
      this.change('prev')
    }
  }
}
