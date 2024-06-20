import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleHeaderDesktopComponent } from './schedule-header-desktop.component';

describe('ScheduleHeaderDesktopComponent', () => {
  let component: ScheduleHeaderDesktopComponent;
  let fixture: ComponentFixture<ScheduleHeaderDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScheduleHeaderDesktopComponent],
    });
    fixture = TestBed.createComponent(ScheduleHeaderDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
