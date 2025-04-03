import { TestBed } from '@angular/core/testing';

import { PreviousOperationsService } from './previous-operations.service';

describe('PreviousOperationsService', () => {
  let service: PreviousOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
