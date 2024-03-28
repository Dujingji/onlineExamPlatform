import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapersViewComponent } from './papers-view.component';

describe('PapersViewComponent', () => {
  let component: PapersViewComponent;
  let fixture: ComponentFixture<PapersViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PapersViewComponent]
    });
    fixture = TestBed.createComponent(PapersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
