import { TestBed } from '@angular/core/testing';

import { USGSEarthquakeService } from './usgsearthquake.service';

describe('USGSEarthquakeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: USGSEarthquakeService = TestBed.get(USGSEarthquakeService);
    expect(service).toBeTruthy();
  });
});
