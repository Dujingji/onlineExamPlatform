import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedRegisterUserInfoComponent } from './united-register-user-info.component';

describe('UnitedRegisterUserInfoComponent', () => {
  let component: UnitedRegisterUserInfoComponent;
  let fixture: ComponentFixture<UnitedRegisterUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedRegisterUserInfoComponent]
    });
    fixture = TestBed.createComponent(UnitedRegisterUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
