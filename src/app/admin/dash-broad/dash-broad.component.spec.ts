import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBroadComponent } from './dash-broad.component';

describe('DashBroadComponent', () => {
  let component: DashBroadComponent;
  let fixture: ComponentFixture<DashBroadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashBroadComponent]
    });
    fixture = TestBed.createComponent(DashBroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
