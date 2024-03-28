import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotExamsPageComponent } from './not-exams-page.component';

describe('NotExamsPageComponent', () => {
  let component: NotExamsPageComponent;
  let fixture: ComponentFixture<NotExamsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotExamsPageComponent]
    });
    fixture = TestBed.createComponent(NotExamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
