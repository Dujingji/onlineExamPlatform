import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSubmitDialogComponent } from './exam-submit-dialog.component';

describe('ExamSubmitDialogComponent', () => {
  let component: ExamSubmitDialogComponent;
  let fixture: ComponentFixture<ExamSubmitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamSubmitDialogComponent]
    });
    fixture = TestBed.createComponent(ExamSubmitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
