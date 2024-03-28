import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapersListComponent } from './papers-list.component';

describe('PapersListComponent', () => {
  let component: PapersListComponent;
  let fixture: ComponentFixture<PapersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PapersListComponent]
    });
    fixture = TestBed.createComponent(PapersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
