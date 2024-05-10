import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamDialogComponent } from './create-exam-dialog.component';

describe('CreateExamDialogComponent', () => {
  let component: CreateExamDialogComponent;
  let fixture: ComponentFixture<CreateExamDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateExamDialogComponent]
    });
    fixture = TestBed.createComponent(CreateExamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
