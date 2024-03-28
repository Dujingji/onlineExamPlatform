import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeAddDialogComponent } from './college-add-dialog.component';

describe('CollegeAddDialogComponent', () => {
  let component: CollegeAddDialogComponent;
  let fixture: ComponentFixture<CollegeAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeAddDialogComponent]
    });
    fixture = TestBed.createComponent(CollegeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
