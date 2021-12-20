import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYearCourseComponent } from './edit-year-course.component';

describe('EditYearCourseComponent', () => {
  let component: EditYearCourseComponent;
  let fixture: ComponentFixture<EditYearCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYearCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYearCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
