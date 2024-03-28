import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeahcerEidtClassroomDialogComponent } from './teahcer-eidt-classroom-dialog.component';

describe('TeahcerEidtClassroomDialogComponent', () => {
  let component: TeahcerEidtClassroomDialogComponent;
  let fixture: ComponentFixture<TeahcerEidtClassroomDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeahcerEidtClassroomDialogComponent]
    });
    fixture = TestBed.createComponent(TeahcerEidtClassroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
