import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaStatusComponent } from './agenda-status.component';

describe('AgendaStatusComponent', () => {
  let component: AgendaStatusComponent;
  let fixture: ComponentFixture<AgendaStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AgendaStatusComponent]
    });
    fixture = TestBed.createComponent(AgendaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
