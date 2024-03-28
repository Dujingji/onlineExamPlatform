import { TestBed } from '@angular/core/testing';

import { DailyServiceService } from './daily-service.service';

describe('DailyServiceService', () => {
  let service: DailyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
