import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomEditDialogComponent } from './classroom-edit-dialog.component';

describe('ClassroomEditDialogComponent', () => {
  let component: ClassroomEditDialogComponent;
  let fixture: ComponentFixture<ClassroomEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomEditDialogComponent]
    });
    fixture = TestBed.createComponent(ClassroomEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
