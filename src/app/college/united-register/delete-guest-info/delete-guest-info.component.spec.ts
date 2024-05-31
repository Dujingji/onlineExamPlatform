import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGuestInfoComponent } from './delete-guest-info.component';

describe('DeleteGuestInfoComponent', () => {
  let component: DeleteGuestInfoComponent;
  let fixture: ComponentFixture<DeleteGuestInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteGuestInfoComponent]
    });
    fixture = TestBed.createComponent(DeleteGuestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
