import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyDetailPageComponent } from './vocabulary-detail-page.component';

describe('VocabularyDetailPageComponent', () => {
  let component: VocabularyDetailPageComponent;
  let fixture: ComponentFixture<VocabularyDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularyDetailPageComponent]
    });
    fixture = TestBed.createComponent(VocabularyDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
