/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PickerService } from './picker.service';

describe('PickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PickerService]
    });
  });

  it('should ...', inject([PickerService], (service: PickerService) => {
    expect(service).toBeTruthy();
  }));
});
