import { TestBed } from '@angular/core/testing';

import { YearTeacherService } from './year-teacher.service';

describe('YearTeacherService', () => {
  let service: YearTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
