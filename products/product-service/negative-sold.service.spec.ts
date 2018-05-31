import { TestBed, inject } from '@angular/core/testing';

import { NegativeSoldService } from './negative-sold.service';

describe('NegativeSoldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NegativeSoldService]
    });
  });

  it('should be created', inject([NegativeSoldService], (service: NegativeSoldService) => {
    expect(service).toBeTruthy();
  }));
});
