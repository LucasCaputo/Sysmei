import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNaviagtionComponent } from './calendar-naviagtion.component';

describe('CalendarNaviagtionComponent', () => {
  let component: CalendarNaviagtionComponent;
  let fixture: ComponentFixture<CalendarNaviagtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarNaviagtionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNaviagtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
