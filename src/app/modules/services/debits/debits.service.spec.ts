import { TestBed } from '@angular/core/testing';

import { DebitsService } from './debits.service';

describe('DebitsService', () => {
  let service: DebitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
