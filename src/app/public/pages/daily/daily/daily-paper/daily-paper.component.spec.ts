import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPaperComponent } from './daily-paper.component';

describe('DailyPaperComponent', () => {
  let component: DailyPaperComponent;
  let fixture: ComponentFixture<DailyPaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyPaperComponent]
    });
    fixture = TestBed.createComponent(DailyPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
