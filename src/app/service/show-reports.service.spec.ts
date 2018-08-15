import { TestBed, inject } from '@angular/core/testing';

import { ShowReportsService } from './show-reports.service';

describe('ShowReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowReportsService]
    });
  });

  it('should be created', inject([ShowReportsService], (service: ShowReportsService) => {
    expect(service).toBeTruthy();
  }));
});
