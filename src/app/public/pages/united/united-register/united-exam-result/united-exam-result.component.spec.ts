import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedExamResultComponent } from './united-exam-result.component';

describe('UnitedExamResultComponent', () => {
  let component: UnitedExamResultComponent;
  let fixture: ComponentFixture<UnitedExamResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedExamResultComponent]
    });
    fixture = TestBed.createComponent(UnitedExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
