import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDialogComponent } from './payments-dialog.component';

describe('PaymentsDialogComponent', () => {
  let component: PaymentsDialogComponent;
  let fixture: ComponentFixture<PaymentsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaymentsDialogComponent]
    });
    fixture = TestBed.createComponent(PaymentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});