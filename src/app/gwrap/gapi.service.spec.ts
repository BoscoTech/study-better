/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GapiService } from './gapi.service';

describe('GapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GapiService]
    });
  });

  it('should ...', inject([GapiService], (service: GapiService) => {
    expect(service).toBeTruthy();
  }));
});
