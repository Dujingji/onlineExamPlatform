import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUnitedStudentDialogComponent } from './upload-united-student-dialog.component';

describe('UploadUnitedStudentDialogComponent', () => {
  let component: UploadUnitedStudentDialogComponent;
  let fixture: ComponentFixture<UploadUnitedStudentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadUnitedStudentDialogComponent]
    });
    fixture = TestBed.createComponent(UploadUnitedStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
