import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPaperComponent } from './exam-paper.component';

describe('ExamPaperComponent', () => {
  let component: ExamPaperComponent;
  let fixture: ComponentFixture<ExamPaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamPaperComponent]
    });
    fixture = TestBed.createComponent(ExamPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
