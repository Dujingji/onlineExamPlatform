import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorEditDialogComponent } from './major-edit-dialog.component';

describe('MajorEditDialogComponent', () => {
  let component: MajorEditDialogComponent;
  let fixture: ComponentFixture<MajorEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MajorEditDialogComponent]
    });
    fixture = TestBed.createComponent(MajorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
