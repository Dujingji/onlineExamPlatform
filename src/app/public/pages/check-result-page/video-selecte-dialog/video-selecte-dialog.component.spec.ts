import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSelecteDialogComponent } from './video-selecte-dialog.component';

describe('VideoSelecteDialogComponent', () => {
  let component: VideoSelecteDialogComponent;
  let fixture: ComponentFixture<VideoSelecteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoSelecteDialogComponent]
    });
    fixture = TestBed.createComponent(VideoSelecteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
