import { TestBed } from '@angular/core/testing';

import { OidService } from './oid.service';

describe('OidService', () => {
  let service: OidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
