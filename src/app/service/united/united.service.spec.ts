import { TestBed } from '@angular/core/testing';

import { UnitedService } from './united.service';

describe('UnitedService', () => {
  let service: UnitedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
