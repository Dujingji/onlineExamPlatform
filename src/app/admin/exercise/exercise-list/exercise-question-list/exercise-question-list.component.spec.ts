import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseQuestionListComponent } from './exercise-question-list.component';

describe('ExerciseQuestionListComponent', () => {
  let component: ExerciseQuestionListComponent;
  let fixture: ComponentFixture<ExerciseQuestionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseQuestionListComponent]
    });
    fixture = TestBed.createComponent(ExerciseQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
