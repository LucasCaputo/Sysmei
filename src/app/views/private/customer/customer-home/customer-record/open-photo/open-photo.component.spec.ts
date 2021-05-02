import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPhotoComponent } from './open-photo.component';

describe('OpenPhotoComponent', () => {
  let component: OpenPhotoComponent;
  let fixture: ComponentFixture<OpenPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
