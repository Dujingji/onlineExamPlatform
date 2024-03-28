import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsExamsListComponent } from './students-exams-list.component';

describe('StudentsExamsListComponent', () => {
  let component: StudentsExamsListComponent;
  let fixture: ComponentFixture<StudentsExamsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsExamsListComponent]
    });
    fixture = TestBed.createComponent(StudentsExamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
