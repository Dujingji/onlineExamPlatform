import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPageComponent } from './exam-paper.component';

describe('ExamPaperComponent', () => {
  let component: ExamPageComponent;
  let fixture: ComponentFixture<ExamPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamPageComponent]
    });
    fixture = TestBed.createComponent(ExamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
