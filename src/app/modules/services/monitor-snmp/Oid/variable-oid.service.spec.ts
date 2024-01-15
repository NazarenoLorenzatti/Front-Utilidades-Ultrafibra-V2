import { TestBed } from '@angular/core/testing';

import { VariableOidService } from './variable-oid.service';

describe('VariableOidService', () => {
  let service: VariableOidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableOidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
