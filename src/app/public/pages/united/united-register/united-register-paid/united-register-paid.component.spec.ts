import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedRegisterPaidComponent } from './united-register-paid.component';

describe('UnitedRegisterPaidComponent', () => {
  let component: UnitedRegisterPaidComponent;
  let fixture: ComponentFixture<UnitedRegisterPaidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedRegisterPaidComponent]
    });
    fixture = TestBed.createComponent(UnitedRegisterPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
