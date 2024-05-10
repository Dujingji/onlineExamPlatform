import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedComponent } from './united.component';

describe('UnitedComponent', () => {
  let component: UnitedComponent;
  let fixture: ComponentFixture<UnitedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedComponent]
    });
    fixture = TestBed.createComponent(UnitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
