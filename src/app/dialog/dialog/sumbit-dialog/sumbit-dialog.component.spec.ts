import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumbitDialogComponent } from './sumbit-dialog.component';

describe('SumbitDialogComponent', () => {
  let component: SumbitDialogComponent;
  let fixture: ComponentFixture<SumbitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumbitDialogComponent]
    });
    fixture = TestBed.createComponent(SumbitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
