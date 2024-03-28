import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapersContentComponent } from './papers-content.component';

describe('PapersContentComponent', () => {
  let component: PapersContentComponent;
  let fixture: ComponentFixture<PapersContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PapersContentComponent]
    });
    fixture = TestBed.createComponent(PapersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
