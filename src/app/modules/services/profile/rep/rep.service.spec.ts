import { TestBed } from '@angular/core/testing';

import { RepService } from './rep.service';

describe('RepService', () => {
  let service: RepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
