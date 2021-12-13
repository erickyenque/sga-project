import { TestBed } from '@angular/core/testing';

import { YearCourseService } from './year-course.service';

describe('YearCourseService', () => {
  let service: YearCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
