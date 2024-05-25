import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleHeaderComponent } from './schedule-header.component';

describe('ScheduleHeaderComponent', () => {
  let component: ScheduleHeaderComponent;
  let fixture: ComponentFixture<ScheduleHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScheduleHeaderComponent]
    });
    fixture = TestBed.createComponent(ScheduleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
