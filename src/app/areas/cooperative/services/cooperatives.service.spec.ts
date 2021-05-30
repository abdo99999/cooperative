import { TestBed } from '@angular/core/testing';

import { CooperativesService } from './cooperatives.service';

describe('CooperativesService', () => {
  let service: CooperativesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperativesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
