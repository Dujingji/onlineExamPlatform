import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSectionListComponent } from './exercise-section-list.component';

describe('ExerciseSectionListComponent', () => {
  let component: ExerciseSectionListComponent;
  let fixture: ComponentFixture<ExerciseSectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseSectionListComponent]
    });
    fixture = TestBed.createComponent(ExerciseSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
