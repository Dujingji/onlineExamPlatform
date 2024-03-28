import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExamPaperComponent } from './show-exam-paper.component';

describe('ShowExamPaperComponent', () => {
  let component: ShowExamPaperComponent;
  let fixture: ComponentFixture<ShowExamPaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowExamPaperComponent]
    });
    fixture = TestBed.createComponent(ShowExamPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
