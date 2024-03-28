import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUrlsEditDialogComponent } from './exam-urls-edit-dialog.component';

describe('ExamUrlsEditDialogComponent', () => {
  let component: ExamUrlsEditDialogComponent;
  let fixture: ComponentFixture<ExamUrlsEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamUrlsEditDialogComponent]
    });
    fixture = TestBed.createComponent(ExamUrlsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
