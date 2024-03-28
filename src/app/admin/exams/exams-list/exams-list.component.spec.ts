import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsListComponent } from './exams-list.component';

describe('ExamsListComponent', () => {
  let component: ExamsListComponent;
  let fixture: ComponentFixture<ExamsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsListComponent]
    });
    fixture = TestBed.createComponent(ExamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
