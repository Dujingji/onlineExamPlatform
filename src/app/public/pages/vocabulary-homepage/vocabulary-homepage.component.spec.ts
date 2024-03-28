import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyHomepageComponent } from './vocabulary-homepage.component';

describe('VocabularyHomepageComponent', () => {
  let component: VocabularyHomepageComponent;
  let fixture: ComponentFixture<VocabularyHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularyHomepageComponent]
    });
    fixture = TestBed.createComponent(VocabularyHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
