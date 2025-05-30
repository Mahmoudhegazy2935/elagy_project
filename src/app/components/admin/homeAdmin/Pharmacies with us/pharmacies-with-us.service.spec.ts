import { TestBed } from '@angular/core/testing';

import { PharmaciesWithUsService } from './pharmacies-with-us.service';

describe('PharmaciesWithUsService', () => {
  let service: PharmaciesWithUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmaciesWithUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
