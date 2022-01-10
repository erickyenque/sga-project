import { TestBed } from '@angular/core/testing';

import { ApafaService } from './apafa.service';

describe('ApafaService', () => {
  let service: ApafaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApafaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
