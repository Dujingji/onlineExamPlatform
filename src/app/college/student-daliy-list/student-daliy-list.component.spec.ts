import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDaliyListComponent } from './student-daliy-list.component';

describe('StudentDaliyListComponent', () => {
  let component: StudentDaliyListComponent;
  let fixture: ComponentFixture<StudentDaliyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDaliyListComponent]
    });
    fixture = TestBed.createComponent(StudentDaliyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
