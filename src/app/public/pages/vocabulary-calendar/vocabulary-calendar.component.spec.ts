import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyCalendarComponent } from './vocabulary-calendar.component';

describe('VocabularyCalendarComponent', () => {
  let component: VocabularyCalendarComponent;
  let fixture: ComponentFixture<VocabularyCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularyCalendarComponent]
    });
    fixture = TestBed.createComponent(VocabularyCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
