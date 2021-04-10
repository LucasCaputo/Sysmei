import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMobileComponent } from './customer-mobile.component';

describe('CustomerMobileComponent', () => {
  let component: CustomerMobileComponent;
  let fixture: ComponentFixture<CustomerMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
