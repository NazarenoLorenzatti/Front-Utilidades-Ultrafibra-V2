import { TestBed } from '@angular/core/testing';

import { HomebankingService } from './homebankingservice.service';

describe('HomebankingserviceService', () => {
  let service: HomebankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomebankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
