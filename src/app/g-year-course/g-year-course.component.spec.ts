import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GYearCourseComponent } from './g-year-course.component';

describe('GYearCourseComponent', () => {
  let component: GYearCourseComponent;
  let fixture: ComponentFixture<GYearCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GYearCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GYearCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
