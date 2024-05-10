import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedRegisterInfoComponent } from './united-register-info.component';

describe('UnitedRegisterInfoComponent', () => {
  let component: UnitedRegisterInfoComponent;
  let fixture: ComponentFixture<UnitedRegisterInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedRegisterInfoComponent]
    });
    fixture = TestBed.createComponent(UnitedRegisterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
