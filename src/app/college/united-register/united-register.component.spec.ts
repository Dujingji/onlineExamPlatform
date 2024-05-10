import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedRegisterComponent } from './united-register.component';

describe('UnitedRegisterComponent', () => {
  let component: UnitedRegisterComponent;
  let fixture: ComponentFixture<UnitedRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedRegisterComponent]
    });
    fixture = TestBed.createComponent(UnitedRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
