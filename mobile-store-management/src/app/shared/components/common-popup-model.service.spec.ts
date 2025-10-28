import { TestBed } from '@angular/core/testing';

import { CommonPopupModelService } from './common-popup-model.service';

describe('CommonPopupModelService', () => {
  let service: CommonPopupModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonPopupModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
