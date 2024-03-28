import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomStudentsDetailComponent } from './classroom-students-detail.component';

describe('ClassroomStudentsDetailComponent', () => {
  let component: ClassroomStudentsDetailComponent;
  let fixture: ComponentFixture<ClassroomStudentsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomStudentsDetailComponent]
    });
    fixture = TestBed.createComponent(ClassroomStudentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
