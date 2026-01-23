import { TestBed } from '@angular/core/testing';

import { CommonServiceTsService } from './common.service.ts.service';

describe('CommonServiceTsService', () => {
  let service: CommonServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
