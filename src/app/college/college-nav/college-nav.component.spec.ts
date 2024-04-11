import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeNavComponent } from './college-nav.component';

describe('CollegeNavComponent', () => {
  let component: CollegeNavComponent;
  let fixture: ComponentFixture<CollegeNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeNavComponent]
    });
    fixture = TestBed.createComponent(CollegeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
