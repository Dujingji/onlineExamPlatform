import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeEditDialogComponent } from './college-edit-dialog.component';

describe('CollegeEditDialogComponent', () => {
  let component: CollegeEditDialogComponent;
  let fixture: ComponentFixture<CollegeEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeEditDialogComponent]
    });
    fixture = TestBed.createComponent(CollegeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
