import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContainerComponent } from './card-container.component';

describe('CardContainerComponent', () => {
  let component: CardContainerComponent;
  let fixture: ComponentFixture<CardContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardContainerComponent],
    });
    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
