import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedRegisterCommitmentComponent } from './united-register-commitment.component';

describe('UnitedRegisterCommitmentComponent', () => {
  let component: UnitedRegisterCommitmentComponent;
  let fixture: ComponentFixture<UnitedRegisterCommitmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedRegisterCommitmentComponent]
    });
    fixture = TestBed.createComponent(UnitedRegisterCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
