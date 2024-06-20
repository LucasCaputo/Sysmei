import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSidenavDesktopComponent } from './calendar-sidenav-desktop.component';

describe('CalendarSidenavDesktopComponent', () => {
  let component: CalendarSidenavDesktopComponent;
  let fixture: ComponentFixture<CalendarSidenavDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalendarSidenavDesktopComponent],
    });
    fixture = TestBed.createComponent(CalendarSidenavDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
