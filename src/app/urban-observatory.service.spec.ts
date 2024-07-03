import { TestBed } from '@angular/core/testing';

import { UrbanObservatoryService } from './urban-observatory.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UrbanObservatoryService', () => {
  let service: UrbanObservatoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UrbanObservatoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
