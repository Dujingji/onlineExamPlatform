import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVocabularyListComponent } from './student-vocabulary-list.component';

describe('StudentVocabularyListComponent', () => {
  let component: StudentVocabularyListComponent;
  let fixture: ComponentFixture<StudentVocabularyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentVocabularyListComponent]
    });
    fixture = TestBed.createComponent(StudentVocabularyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
