import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseNavComponent } from './exercise-nav.component';

describe('ExerciseNavComponent', () => {
  let component: ExerciseNavComponent;
  let fixture: ComponentFixture<ExerciseNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseNavComponent]
    });
    fixture = TestBed.createComponent(ExerciseNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
