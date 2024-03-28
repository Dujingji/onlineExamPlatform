import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPaperEditComponent } from './teacher-paper-edit.component';

describe('TeacherPaperEditComponent', () => {
  let component: TeacherPaperEditComponent;
  let fixture: ComponentFixture<TeacherPaperEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherPaperEditComponent]
    });
    fixture = TestBed.createComponent(TeacherPaperEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
