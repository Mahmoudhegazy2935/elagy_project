import { TestBed } from '@angular/core/testing';

import { PharmacyAdminServicesService } from './pharmacy-admin-services.service';

describe('PharmacyAdminServicesService', () => {
  let service: PharmacyAdminServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacyAdminServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
