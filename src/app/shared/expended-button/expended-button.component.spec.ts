import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpendedButtonComponent } from './expended-button.component';

describe('ExpendedButtonComponent', () => {
  let component: ExpendedButtonComponent;
  let fixture: ComponentFixture<ExpendedButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpendedButtonComponent]
    });
    fixture = TestBed.createComponent(ExpendedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
