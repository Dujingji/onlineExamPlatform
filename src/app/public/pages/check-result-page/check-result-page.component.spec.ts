import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckResultPageComponent } from './check-result-page.component';

describe('CheckResultPageComponent', () => {
  let component: CheckResultPageComponent;
  let fixture: ComponentFixture<CheckResultPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckResultPageComponent]
    });
    fixture = TestBed.createComponent(CheckResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
