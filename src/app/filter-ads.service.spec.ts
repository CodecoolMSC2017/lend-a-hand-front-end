import { TestBed, inject } from '@angular/core/testing';

import { FilterAdsService } from './filter-ads.service';

describe('FilterAdsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterAdsService]
    });
  });

  it('should be created', inject([FilterAdsService], (service: FilterAdsService) => {
    expect(service).toBeTruthy();
  }));
});
