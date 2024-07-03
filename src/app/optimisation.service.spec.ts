import {TestBed} from '@angular/core/testing';

import {OptimisationService} from './optimisation.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OptimisationService', () => {
  let service: OptimisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(OptimisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
