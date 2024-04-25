import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExerciseListComponent } from './student-exercise-list.component';

describe('StudentExerciseListComponent', () => {
  let component: StudentExerciseListComponent;
  let fixture: ComponentFixture<StudentExerciseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentExerciseListComponent]
    });
    fixture = TestBed.createComponent(StudentExerciseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
