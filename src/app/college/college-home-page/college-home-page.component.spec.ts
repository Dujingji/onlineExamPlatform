import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeHomePageComponent } from './college-home-page.component';

describe('CollegeHomePageComponent', () => {
  let component: CollegeHomePageComponent;
  let fixture: ComponentFixture<CollegeHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeHomePageComponent]
    });
    fixture = TestBed.createComponent(CollegeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
