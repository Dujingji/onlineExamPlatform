import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyDetailListComponent } from './vocabulary-detail-list.component';

describe('VocabularyDetailListComponent', () => {
  let component: VocabularyDetailListComponent;
  let fixture: ComponentFixture<VocabularyDetailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularyDetailListComponent]
    });
    fixture = TestBed.createComponent(VocabularyDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
