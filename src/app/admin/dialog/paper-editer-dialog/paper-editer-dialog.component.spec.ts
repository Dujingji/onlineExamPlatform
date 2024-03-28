import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperEditerDialogComponent } from './paper-editer-dialog.component';

describe('PaperEditerDialogComponent', () => {
  let component: PaperEditerDialogComponent;
  let fixture: ComponentFixture<PaperEditerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaperEditerDialogComponent]
    });
    fixture = TestBed.createComponent(PaperEditerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
