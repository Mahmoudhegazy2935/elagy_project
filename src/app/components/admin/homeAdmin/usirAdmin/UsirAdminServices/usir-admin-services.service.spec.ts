import { TestBed } from '@angular/core/testing';

import { UsirAdminServicesService } from './usir-admin-services.service';

describe('UsirAdminServicesService', () => {
  let service: UsirAdminServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsirAdminServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
