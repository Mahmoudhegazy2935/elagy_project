import { TestBed } from '@angular/core/testing';

import { ProcessingCartService } from './processing-cart.service';

describe('ProcessingCartService', () => {
  let service: ProcessingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
