import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedResultComponent } from './united-result.component';

describe('UnitedResultComponent', () => {
  let component: UnitedResultComponent;
  let fixture: ComponentFixture<UnitedResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedResultComponent]
    });
    fixture = TestBed.createComponent(UnitedResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
