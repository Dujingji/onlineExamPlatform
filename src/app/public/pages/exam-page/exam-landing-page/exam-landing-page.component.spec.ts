import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamLandingPageComponent } from './exam-landing-page.component';

describe('ExamLandingPageComponent', () => {
  let component: ExamLandingPageComponent;
  let fixture: ComponentFixture<ExamLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamLandingPageComponent]
    });
    fixture = TestBed.createComponent(ExamLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
