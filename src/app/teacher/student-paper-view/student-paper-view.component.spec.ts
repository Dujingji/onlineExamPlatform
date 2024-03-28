import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaperViewComponent } from './student-paper-view.component';

describe('StudentPaperViewComponent', () => {
  let component: StudentPaperViewComponent;
  let fixture: ComponentFixture<StudentPaperViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentPaperViewComponent]
    });
    fixture = TestBed.createComponent(StudentPaperViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
