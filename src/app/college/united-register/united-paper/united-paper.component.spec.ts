import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedPaperComponent } from './united-paper.component';

describe('UnitedPaperComponent', () => {
  let component: UnitedPaperComponent;
  let fixture: ComponentFixture<UnitedPaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedPaperComponent]
    });
    fixture = TestBed.createComponent(UnitedPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
