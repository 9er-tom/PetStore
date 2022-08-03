import { TestBed } from '@angular/core/testing';

import { WDClientService } from './wdclient.service';

describe('WDClientService', () => {
  let service: WDClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WDClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
