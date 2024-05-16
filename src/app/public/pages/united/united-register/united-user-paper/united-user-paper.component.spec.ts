import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedUserPaperComponent } from './united-user-paper.component';

describe('UnitedUserPaperComponent', () => {
  let component: UnitedUserPaperComponent;
  let fixture: ComponentFixture<UnitedUserPaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedUserPaperComponent]
    });
    fixture = TestBed.createComponent(UnitedUserPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
