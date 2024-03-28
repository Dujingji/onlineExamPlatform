import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomExamEditDialogComponent } from './classroom-exam-edit-dialog.component';

describe('ClassroomExamEditDialogComponent', () => {
  let component: ClassroomExamEditDialogComponent;
  let fixture: ComponentFixture<ClassroomExamEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomExamEditDialogComponent]
    });
    fixture = TestBed.createComponent(ClassroomExamEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
