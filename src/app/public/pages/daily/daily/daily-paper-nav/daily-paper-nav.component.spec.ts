import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPaperNavComponent } from './daily-paper-nav.component';

describe('DailyPaperNavComponent', () => {
  let component: DailyPaperNavComponent;
  let fixture: ComponentFixture<DailyPaperNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyPaperNavComponent]
    });
    fixture = TestBed.createComponent(DailyPaperNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
