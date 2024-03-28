import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperSelectionDialogComponent } from './paper-selection-dialog.component';

describe('PaperSelectionDialogComponent', () => {
  let component: PaperSelectionDialogComponent;
  let fixture: ComponentFixture<PaperSelectionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaperSelectionDialogComponent]
    });
    fixture = TestBed.createComponent(PaperSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
