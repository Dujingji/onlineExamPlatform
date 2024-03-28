import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEditDialogComponent } from './exam-edit-dialog.component';

describe('ExamEditDialogComponent', () => {
  let component: ExamEditDialogComponent;
  let fixture: ComponentFixture<ExamEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamEditDialogComponent]
    });
    fixture = TestBed.createComponent(ExamEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
