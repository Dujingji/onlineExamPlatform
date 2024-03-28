import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditClassroomDialogComponent } from './user-edit-classroom-dialog.component';

describe('UserEditClassroomDialogComponent', () => {
  let component: UserEditClassroomDialogComponent;
  let fixture: ComponentFixture<UserEditClassroomDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditClassroomDialogComponent]
    });
    fixture = TestBed.createComponent(UserEditClassroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
