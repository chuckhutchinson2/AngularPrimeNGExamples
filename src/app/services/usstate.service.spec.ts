import { TestBed } from '@angular/core/testing';

import { USStateService } from './usstate.service';

describe('USStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: USStateService = TestBed.get(USStateService);
    expect(service).toBeTruthy();
  });
});
