import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNavigationDesktopComponent } from './calendar-navigation-desktop.component';

describe('CalendarNavigationDesktopComponent', () => {
  let component: CalendarNavigationDesktopComponent;
  let fixture: ComponentFixture<CalendarNavigationDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalendarNavigationDesktopComponent]
    });
    fixture = TestBed.createComponent(CalendarNavigationDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
