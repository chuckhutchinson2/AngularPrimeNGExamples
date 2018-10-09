import { TestBed } from '@angular/core/testing';

import { GetIPAddressService } from './get-ipaddress.service';

describe('GetIPAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetIPAddressService = TestBed.get(GetIPAddressService);
    expect(service).toBeTruthy();
  });
});
