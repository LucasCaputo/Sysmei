import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallPwaComponentComponent } from './install-pwa.component';

describe('InstallPwaComponentComponent', () => {
  let component: InstallPwaComponentComponent;
  let fixture: ComponentFixture<InstallPwaComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InstallPwaComponentComponent],
    });
    fixture = TestBed.createComponent(InstallPwaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
