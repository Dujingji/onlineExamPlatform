import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitedSubjectEditorComponent } from './united-subject-editor.component';

describe('UnitedSubjectEditorComponent', () => {
  let component: UnitedSubjectEditorComponent;
  let fixture: ComponentFixture<UnitedSubjectEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitedSubjectEditorComponent]
    });
    fixture = TestBed.createComponent(UnitedSubjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
