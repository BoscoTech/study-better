/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FactSetService } from './fact-set.service';

describe('FactSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactSetService]
    });
  });

  it('should ...', inject([FactSetService], (service: FactSetService) => {
    expect(service).toBeTruthy();
  }));
});
