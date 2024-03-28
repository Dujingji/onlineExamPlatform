import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotResultPageComponent } from './not-result-page.component';

describe('NotResultPageComponent', () => {
  let component: NotResultPageComponent;
  let fixture: ComponentFixture<NotResultPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotResultPageComponent]
    });
    fixture = TestBed.createComponent(NotResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
